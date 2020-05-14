import {OrdemServico, OrdemServicoFull} from '.';
import {StatusOrdemServico} from './StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: OrdemServico | OrdemServicoFull) {
    if (ordemServico.numeroDocumentoOrdemServicoSEI) {
        return StatusOrdemServico.EMITIDA;
    } else {
        return StatusOrdemServico.RASCUNHO;
    }
}
