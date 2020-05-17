import {OrdemServicoFull} from '../../../../models';

export function novoEntregavelOrdemServico(ordemServico: OrdemServicoFull) {
    return {
        id: undefined,
        idOrdemServico: <number>ordemServico.id,
        descricao: '',
        ordem: ordemServico.entregaveis ? ordemServico.entregaveis.length : 0,
    };
}
