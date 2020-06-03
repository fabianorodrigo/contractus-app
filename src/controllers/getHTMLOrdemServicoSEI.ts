import moment, {DurationInputArg2} from 'moment';
import {formataNumeroStringLocal} from '../commonLib/formatacao';
import {AreaRequisitante, Contrato, Fornecedor, OrdemServico, TipoOrdemServicoContrato} from '../models';
import {getHTMLFromTemplate} from './getHTMLFromTemplate';

export function getHTMLOrdemServicoSEI(
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
    fornecedor: Fornecedor,
    areaRequisitante: AreaRequisitante,
) {
    if (!tipoOrdemServico.templateOrdemServico)
        throw new Error(`Tipo de Ordem de Serviço não tem Template definido na base de dados`);
    //como teremos que alterar e incluir alguns valores da OS para passar para o template, clonamos
    const osFormatada = getOrdemServicoFormatadaToTemplate(ordemServico, tipoOrdemServico);
    areaRequisitante.nomeArea = areaRequisitante.nomeArea.toUpperCase();

    const objRef: {[name: string]: any} = {
        os: osFormatada,
        contrato,
        tipoOrdemServico,
        fornecedor,
        areaRequisitante,
        projeto: {nome: ordemServico.idProjeto},
    };

    return getHTMLFromTemplate(tipoOrdemServico.templateOrdemServico, objRef);
}

/**
 * Clona a {ordemServico}, formata alguns atributos e inclui outros necessários ao template HTML da OS para inclusão no SEI
 *
 * @param ordemServico Ordem de Serviço original
 */
function getOrdemServicoFormatadaToTemplate(ordemServico: OrdemServico, tipoOrdemServico: TipoOrdemServicoContrato) {
    const osFormatada = JSON.parse(JSON.stringify(ordemServico));
    osFormatada.numero = String(ordemServico.numero).padStart(3, '0');
    osFormatada.emergencialSim = ordemServico.emergencial ? 'X' : '';
    osFormatada.emergencialNao = ordemServico.emergencial ? '' : 'X';
    osFormatada.dtEmissao = moment(ordemServico.dtEmissao).format('DD/MM/YYYY');
    osFormatada.dtInicioPlanejada = moment(ordemServico.etapas[0].dtInicioPlanejada).format('DD/MM/YYYY');
    osFormatada.dtFimPlanejada = moment(ordemServico.etapas[ordemServico.etapas.length - 1].dtFimPlanejada).format(
        'DD/MM/YYYY',
    );
    osFormatada.dtFimGarantia = moment(ordemServico.etapas[ordemServico.etapas.length - 1].dtFimPlanejada)
        .add(tipoOrdemServico.tempoGarantia, tipoOrdemServico.unidadeGarantia as DurationInputArg2)
        .format('DD/MM/YYYY');
    osFormatada.nomeFiscalTecnico = ordemServico.nomeFiscalTecnico.toUpperCase();
    osFormatada.nomeRequisitante = ordemServico.nomeRequisitante.toUpperCase();

    let totalQuantidadeEstimada = 0;
    let totalValorEstimado = 0;
    //Formatação dos itens da OS
    osFormatada.itens.forEach((item: any) => {
        item.quantidadeEstimada = parseFloat(item.quantidadeEstimada);
        item.valorEstimado = formataNumeroStringLocal(
            parseFloat(item.quantidadeEstimada) * parseFloat(item.valorUnitarioEstimado),
            true,
        );
        totalQuantidadeEstimada += item.quantidadeEstimada;
        totalValorEstimado += item.quantidadeEstimada * parseFloat(item.valorUnitarioEstimado);
        item.quantidadeEstimada = formataNumeroStringLocal(item.quantidadeEstimada, false);
    });
    osFormatada.totalMetrica = osFormatada.itens[0].siglaMetrica; //se tiver mais de uma métrica, isso fica errado
    osFormatada.totalQuantidadeEstimada = formataNumeroStringLocal(totalQuantidadeEstimada, false);
    osFormatada.totalValorEstimado = formataNumeroStringLocal(totalValorEstimado, true);
    //Formatação das etapas da OS
    osFormatada.etapas.forEach((etapa: any) => {
        etapa.dtInicioPlanejada = moment(etapa.dtInicioPlanejada).format('DD/MM/YYYY');
        etapa.dtFimPlanejada = moment(etapa.dtFimPlanejada).format('DD/MM/YYYY');
    });

    return osFormatada;
}
