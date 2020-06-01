import {useSnackbar} from 'notistack';
import {Dispatch, useContext} from 'react';
import {ActionType, AppContext, AppContextStoreType, AppDispatch} from '../App-Context';
import {formataMensagemErro, formataMensagemErroLoopback} from '../services/formatacaoMensagensErro';
import {RespostaServico} from '../services/restService';

export const useGetRespostaServico = <T extends any>(funcaoBackend: Function) => {
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const {
        dispatch: appDispatch,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<AppDispatch>;
    } = useContext(AppContext);

    //Função que para setar o state que coloca o BackDrop na frente da tela com o indicador de progresso ativo
    const emEspera = (emEspera: boolean) => {
        appDispatch({
            tipo: ActionType.EM_ESPERA,
            dados: emEspera,
        });
    };

    const getRespostaServico = async function (p1?: any, p2?: any, p3?: any, p4?: any): Promise<RespostaServico<T>> {
        try {
            emEspera(true);
            const respostaServico = await funcaoBackend(p1, p2, p3, p4);
            if (!respostaServico.sucesso) {
                enqueueSnackbar(formataMensagemErroLoopback((respostaServico.dados as any).error), {
                    variant: 'error',
                });
                console.error(respostaServico.dados);
            }
            return respostaServico;
        } catch (e) {
            enqueueSnackbar(formataMensagemErro(e), {
                variant: 'error',
            });
            console.error(e);
            return {sucesso: false, dados: {} as T};
        } finally {
            emEspera(false);
        }
    };
    return {getRespostaServico};
};
