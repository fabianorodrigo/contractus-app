import {Dispatch, useContext} from 'react';
import {IOrdemServico} from '../../../commonLib/interface-models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType, AppDispatch} from '../../App-Context';
import {useGetRespostaServico} from '../../customHooks/useGetRespostaServico';
import {EditionType, IEntidadeContexto} from '../../models/EntidadeContext';
import {getOrdemServico} from '../../services/backend';
import {OrdemServicoContext} from './contextOrdemServico';

export function useAbrirDialogRecebimento() {
    const {
        dispatch: appDispatch,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<AppDispatch>;
    } = useContext(AppContext);
    const {dispatch: osDispatch}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const {getRespostaServico: getRespostaOrdemServico} = useGetRespostaServico<IOrdemServico>(getOrdemServico);

    return async (ordemServico: IOrdemServico) => {
        //Se OS já existe (tem id), busca todos os dados incluindo as relations da ordem de serviço
        if (ordemServico && ordemServico.id) {
            const respostaServico = await getRespostaOrdemServico(ordemServico.id);
            if (respostaServico.sucesso) {
                ordemServico = respostaServico.dados;
                //atualiza na state da aplicação os dados completos
                appDispatch({
                    tipo: ActionType.INCLUIR,
                    entidade: ActionEntity.ORDEM_SERVICO,
                    dados: ordemServico,
                });
                //atualiza o state do contexto da ordem de serviço com a ordem sendo editada
                osDispatch({
                    tipo: EditionType.SETAR_STATUS,
                    dado: ordemServico,
                    status: {emitindoTermoRecebimento: true},
                });
            }
        } else {
            //atualiza o state do contexto uma ordem de serviço em branco
            osDispatch({tipo: EditionType.NOVO});
        }
    };
}
