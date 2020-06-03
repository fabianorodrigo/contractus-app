import moment from 'moment';
import numero from 'numero-por-extenso';
import {arredonda, formataNumeroStringLocal, tem} from '../commonLib';
import {TipoRecebimentoOrdemServico} from '../commonLib/interface-models/TipoRecebimentoOrdemServico';
import {
    AreaRequisitante,
    Contrato,
    Fornecedor,
    OrdemServico,
    RecebimentoOrdemServico,
    TipoOrdemServicoContrato,
} from '../models';
import {getHTMLFromTemplate} from './getHTMLFromTemplate';

export function getHTMLTermoRecebimentoSEI(
    recebimento: RecebimentoOrdemServico,
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
    fornecedor: Fornecedor,
    areaRequisitante: AreaRequisitante,
) {
    let template = '';
    if (recebimento.tipoRecebimento == TipoRecebimentoOrdemServico.PROVISORIO) {
        if (
            !tem(tipoOrdemServico.templateTermoRecebimentoProvisorio) ||
            tipoOrdemServico.templateTermoRecebimentoProvisorio?.trim() == ''
        ) {
            throw new Error(
                `Tipo de Ordem de Serviço não tem Template de Termo de Recebimento Provisório definido na base de dados`,
            );
        } else {
            template = tipoOrdemServico.templateTermoRecebimentoProvisorio as string;
        }
    } else if (recebimento.tipoRecebimento == TipoRecebimentoOrdemServico.DEFINITIVO) {
        if (
            !tem(tipoOrdemServico.templateTermoRecebimentoDefinitivo) ||
            tipoOrdemServico.templateTermoRecebimentoDefinitivo?.trim() == ''
        ) {
            throw new Error(
                `Tipo de Ordem de Serviço não tem Template de Termo de Recebimento Definitivo definido na base de dados`,
            );
        } else {
            template = tipoOrdemServico.templateTermoRecebimentoDefinitivo as string;
        }
    }

    //como teremos que alterar e incluir alguns valores da OS para passar para o template, clonamos
    const recebimentoFormatado = getTermoRecebimentoFormatadoToTemplate(recebimento);
    recebimentoFormatado.numeroOS = String(ordemServico.numero).padStart(3, '0');
    const ordemServicoFormatada = getOrdemServicoFormatadaToTemplate(ordemServico, contrato, tipoOrdemServico);
    areaRequisitante.nomeArea = areaRequisitante.nomeArea.toUpperCase();

    const objRef: {[name: string]: any} = {
        recebimento: recebimentoFormatado,
        os: ordemServicoFormatada,
        contrato,
        tipoOrdemServico,
        fornecedor,
        areaRequisitante,
        projeto: {nome: ordemServico.idProjeto},
    };
    return getHTMLFromTemplate(template, objRef);
}

/**
 * Clona a {recebimento}, formata alguns atributos e inclui outros necessários ao template HTML do Termo de Recebimento para inclusão no SEI
 *
 * @param recebimento Etapa da Ordem de Serviço original
 */
function getTermoRecebimentoFormatadoToTemplate(recebimento: RecebimentoOrdemServico) {
    const recebimentoFormatado = JSON.parse(JSON.stringify(recebimento));
    recebimentoFormatado.dtRecebimento = moment(recebimento.dtRecebimento).format('DD/MM/YYYY');

    return recebimentoFormatado;
}

/**
 * Clona a {ordemServico}, formata alguns atributos e inclui outros necessários ao template HTML da OS para inclusão no SEI
 *
 * @param ordemServico Ordem de Serviço original
 */
function getOrdemServicoFormatadaToTemplate(
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
) {
    const osFormatada = JSON.parse(JSON.stringify(ordemServico));
    osFormatada.numero = String(ordemServico.numero).padStart(3, '0');
    osFormatada.nomeFiscalTecnico = ordemServico.nomeFiscalTecnico.toUpperCase();
    osFormatada.nomeRequisitante = ordemServico.nomeRequisitante.toUpperCase();

    let totalQuantidadeReal = 0;
    let totalValorReal = 0;
    //Totalização e formatação da quantidade real recebida e valores totais
    osFormatada.itens.forEach((item: any) => {
        item.totalQuantidadeReal = parseFloat(item.quantidadeReal);
        item.valorReal = formataNumeroStringLocal(
            parseFloat(item.quantidadeReal) * parseFloat(item.valorUnitarioReal),
            true,
        );
        totalQuantidadeReal += item.quantidadeReal;
        totalValorReal += item.quantidadeReal * parseFloat(item.valorUnitarioReal);
        item.quantidadeReal = formataNumeroStringLocal(item.quantidadeReal, false);
    });
    const metrica = tem(contrato.metricas)
        ? contrato.metricas.find((m) => m.sigla == osFormatada.itens[0].siglaMetrica)
        : null; //FIXME: se tiver mais de uma métrica, isso fica errado
    osFormatada.totalMetrica = osFormatada.itens[0].siglaMetrica; //FIXME: se tiver mais de uma métrica, isso fica errado
    if (tem(metrica)) {
        osFormatada.descricaoMetrica = metrica?.descricao;
    }
    osFormatada.valorUnitarioMetrica = formataNumeroStringLocal(osFormatada.itens[0].valorUnitarioReal, true);
    osFormatada.valorUnitarioMetricaExtenso = numero.porExtenso(
        arredonda(osFormatada.itens[0].valorUnitarioReal),
        numero.estilo.monetario,
    );
    osFormatada.totalQuantidadeReal = formataNumeroStringLocal(totalQuantidadeReal, false);
    osFormatada.totalQuantidadeRealExtenso = numero.porExtenso(arredonda(totalQuantidadeReal));
    osFormatada.totalValorReal = formataNumeroStringLocal(totalValorReal, true);
    osFormatada.totalValorRealExtenso = numero.porExtenso(arredonda(totalValorReal), numero.estilo.monetario);

    ////Totalização e formatação dos pagamentos já adiantados
    let totalValorAdiantamentoReal = 0;
    osFormatada.etapas.forEach((etapa: any) => {
        etapa.valorAdiantamentoReal = parseFloat(etapa.valorAdiantamentoReal || 0);
        totalValorAdiantamentoReal += etapa.valorAdiantamentoReal;
    });
    osFormatada.totalValorAdiantamentoReal = formataNumeroStringLocal(totalValorAdiantamentoReal, true);
    osFormatada.totalValorAdiantamentoRealExtenso = numero.porExtenso(
        arredonda(totalValorAdiantamentoReal),
        numero.estilo.monetario,
    );

    //Formatação das indicadores da OS

    if (!tem(osFormatada.indicadores)) osFormatada.indicadores = [];
    if (osFormatada.indicadores.length == 0) {
        if (tipoOrdemServico.indicadores) {
            tipoOrdemServico.indicadores.forEach((indicador) => {
                osFormatada.indicadores.push({
                    sigla: indicador.sigla,
                    valorIndicadorApurado: '',
                    descricaoSancao: '',
                    valorGlosa: '',
                });
            });
        }
    }
    let totalDescontosINMS = 0;
    osFormatada.indicadores.forEach((indicador: any) => {
        let valorGlosa = parseFloat(indicador.valorGlosa || 0);
        indicador.valorIndicadorApurado = formataNumeroStringLocal(indicador.valorIndicadorApurado, false);
        indicador.valorGlosa = formataNumeroStringLocal(valorGlosa, true);
        totalDescontosINMS += valorGlosa;
    });

    //saldo final
    const totalSaldoFinal = totalValorReal - totalValorAdiantamentoReal - totalDescontosINMS;
    osFormatada.totalSaldoFinal = formataNumeroStringLocal(totalSaldoFinal, true);
    osFormatada.totalSaldoFinalExtenso = numero.porExtenso(arredonda(totalSaldoFinal), numero.estilo.monetario);

    return osFormatada;
}
