import {OrdemServicoFull} from '../../../models';
import {ContratosMap} from '../../models/TypeContext';

export function getTipoOrdemServico(ordemServico: OrdemServicoFull, contratos: ContratosMap) {
    if (ordemServico.idTipoOrdemServicoContrato && contratos[ordemServico.idContrato]) {
        const tipoOS = contratos[ordemServico.idContrato].tiposOrdemServico.find(
            (tos) => tos.id == ordemServico.idTipoOrdemServicoContrato,
        );
        return tipoOS;
    } else {
        return null;
    }
}
