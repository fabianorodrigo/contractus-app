import {OrdemServicoFull} from '.';
import {StatusOrdemServico} from './StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: OrdemServicoFull) {
    if (ordemServico.numeroDocumentoSEIOrdemServico) {
        return StatusOrdemServico.EMITIDA;
    } else {
        return StatusOrdemServico.RASCUNHO;
    }
}
