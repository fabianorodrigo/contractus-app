import {IOrdemServico} from '.';
import {tem} from '../permissoes/tem';
import {StatusOrdemServico} from './StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: IOrdemServico) {
    if (tem(ordemServico.numeroDocumentoOrdemServicoSEI)) {
        return StatusOrdemServico.EMITIDA;
    } else {
        return StatusOrdemServico.RASCUNHO;
    }
}
