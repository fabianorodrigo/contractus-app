import {IOrdemServico} from '.';
import {tem} from '../permissoes/tem';
import {StatusOrdemServico} from './StatusOrdemServico';

export function getStatusOrdemServico(ordemServico: IOrdemServico): StatusOrdemServico {
    if (tem(ordemServico.dtCancelamento)) {
        StatusOrdemServico.CANCELADA;
    } else if (tem(ordemServico.numeroDocumentoOrdemServicoSEI)) {
        return StatusOrdemServico.EMITIDA;
    }
    return StatusOrdemServico.RASCUNHO;
}
