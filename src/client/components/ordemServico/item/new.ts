import {Contrato, OrdemServicoFull} from '../../../../models';

export function novoItemOrdemServico(ordemServico: OrdemServicoFull, contrato: Contrato) {
    return {
        id: undefined,
        idOrdemServico: ordemServico.id,
        descricao: '',
        idProduto: '',
        siglaMetrica: contrato && contrato.metricas.length > 0 ? contrato.metricas[0].sigla : '',
        quantidadeEstimada: 1,
        valorUnitarioEstimado: contrato && contrato.metricas.length > 0 ? contrato.metricas[0].valorUnitario : 1,
    };
}
