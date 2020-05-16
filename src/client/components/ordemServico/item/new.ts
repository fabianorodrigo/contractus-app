import {useContext} from 'react';
import {OrdemServicoFull} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {ContratosMap} from '../../../models/TypeContext';

export function novoItemOrdemServico(ordemServico: OrdemServicoFull) {
    const {state: appState}: {state: AppContextStoreType} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;
    return {
        idOrdemServico: ordemServico.id,
        descricao: '',
        idProduto: '',
        siglaMetrica:
            contratos[ordemServico.idContrato] && contratos[ordemServico.idContrato].metricas.length > 0
                ? contratos[ordemServico.idContrato].metricas[0].sigla
                : '',
        quantidadeEstimada: '',
        valorUnitarioEstimado:
            contratos[ordemServico.idContrato] && contratos[ordemServico.idContrato].metricas.length > 0
                ? contratos[ordemServico.idContrato].metricas[0].valorUnitario
                : '',
    };
}
