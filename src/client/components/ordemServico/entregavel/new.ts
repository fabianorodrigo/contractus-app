import {IOrdemServico} from '../../../../commonLib/interface-models';

export function novoEntregavelOrdemServico(ordemServico: IOrdemServico) {
    return {
        id: undefined,
        idOrdemServico: <number>ordemServico.id,
        descricao: '',
        ordem: ordemServico.entregaveis ? ordemServico.entregaveis.length : 0,
    };
}
