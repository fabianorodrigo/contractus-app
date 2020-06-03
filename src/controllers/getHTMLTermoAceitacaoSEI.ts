import {formataNumeroStringLocal} from '../commonLib/formatacao';
import {
    AreaRequisitante,
    Contrato,
    EtapaOrdemServico,
    Fornecedor,
    OrdemServico,
    TipoOrdemServicoContrato,
} from '../models';
import {getHTMLFromTemplate} from './getHTMLFromTemplate';

export function getHTMLTermoAceitacaoSEI(
    etapa: EtapaOrdemServico,
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
    fornecedor: Fornecedor,
    areaRequisitante: AreaRequisitante,
) {
    if (!tipoOrdemServico.templateTermoAceitacao)
        throw new Error(`Tipo de Ordem de Serviço não tem Template de Termo de Aceitação definido na base de dados`);
    //como teremos que alterar e incluir alguns valores da OS para passar para o template, clonamos
    const etapaFormatada = getTermoAceitacaoFormatadoToTemplate(etapa);
    etapaFormatada.numeroOS = String(ordemServico.numero).padStart(3, '0');
    areaRequisitante.nomeArea = areaRequisitante.nomeArea.toUpperCase();

    const objRef: {[name: string]: any} = {
        etapa: etapaFormatada,
        os: ordemServico,
        contrato,
        tipoOrdemServico,
        fornecedor,
        areaRequisitante,
        projeto: {nome: ordemServico.idProjeto},
    };

    return getHTMLFromTemplate(tipoOrdemServico.templateTermoAceitacao, objRef);
}

/**
 * Clona a {etapa}, formata alguns atributos e inclui outros necessários ao template HTML do Termo de Aceitação para inclusão no SEI
 *
 * @param etapa Etapa da Ordem de Serviço original
 */
function getTermoAceitacaoFormatadoToTemplate(etapa: EtapaOrdemServico) {
    const etapaFormatada = JSON.parse(JSON.stringify(etapa));
    etapaFormatada.idResultadoEtapa =
        etapa.idResultadoEtapa == 'A'
            ? 'ACEITA'
            : etapa.idResultadoEtapa == 'P'
            ? 'ACEITA PARCIALMENTE'
            : etapa.idResultadoEtapa == 'R'
            ? 'REJEITADA'
            : etapa.idResultadoEtapa;
    etapaFormatada.valorAdiantamentoPlanejado = formataNumeroStringLocal(
        <number>etapa.valorAdiantamentoPlanejado,
        true,
    );
    etapaFormatada.valorAdiantamentoReal = formataNumeroStringLocal(<number>etapa.valorAdiantamentoReal, true);
    return etapaFormatada;
}
