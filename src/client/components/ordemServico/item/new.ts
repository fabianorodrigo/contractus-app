import {IContrato, IOrdemServico} from '../../../../commonLib/interface-models';

export function novoItemOrdemServico(ordemServico: IOrdemServico, contrato: IContrato) {
    return {
        id: undefined,
        idOrdemServico: ordemServico.id,
        descricao: '',
        idProduto: ordemServico.idProduto,
        siglaMetrica: contrato && contrato.metricas.length > 0 ? contrato.metricas[0].sigla : '',
        quantidadeEstimada: 1,
        valorUnitarioEstimado: contrato && contrato.metricas.length > 0 ? contrato.metricas[0].valorUnitario : 1,
    };
}
