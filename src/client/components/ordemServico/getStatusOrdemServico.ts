import {OrdemServicoFull} from '../../../models';
import {StatusOrdemServico} from '../../../models/StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: OrdemServicoFull) {
    if (ordemServico.numeroDocumentoSEIOrdemServico) {
        return StatusOrdemServico.EMITIDA;
    } else {
        return StatusOrdemServico.RASCUNHO;
    }
}
