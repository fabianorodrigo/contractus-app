import {IOrdemServico} from '.';
import {StatusOrdemServico} from './StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: IOrdemServico) {
    if (ordemServico.numeroDocumentoOrdemServicoSEI) {
        return StatusOrdemServico.EMITIDA;
    } else {
        return StatusOrdemServico.RASCUNHO;
    }
}
