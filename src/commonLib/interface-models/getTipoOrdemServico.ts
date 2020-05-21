import {IOrdemServico} from '.';
import {ContratosMap} from './maps-entidades-types';
import {ITipoOrdemServicoContrato} from './tipo-ordem-servico-contrato';

export function getTipoOrdemServico(
    ordemServico: IOrdemServico,
    contratos: ContratosMap,
): ITipoOrdemServicoContrato | undefined {
    if (ordemServico.idTipoOrdemServicoContrato && contratos[ordemServico.idContrato]) {
        const tipoOS = contratos[ordemServico.idContrato].tiposOrdemServico.find(
            (tos) => tos.id == ordemServico.idTipoOrdemServicoContrato,
        );
        return tipoOS;
    } else {
        return undefined;
    }
}
