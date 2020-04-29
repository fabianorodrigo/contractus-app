import {OrdemServicoFull} from '../../../../models';

export function novoEntregavelOrdemServico(ordemServico: OrdemServicoFull) {
    return {
        idOrdemServico: ordemServico.id,
        descricao: '',
        linkEvidencia: '',
        ordem: ordemServico.entregaveis ? ordemServico.entregaveis.length : 0,
    };
}
