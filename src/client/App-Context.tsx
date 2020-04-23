import React, {createContext, ReactNode, useReducer} from 'react';
import {ContratosMap, FornecedoresMap, OrdensServicoMap} from './models/TypeContext';

export type AppContextStoreType = {
    fornecedores: FornecedoresMap;
    contratos: ContratosMap;
    ordensServico: OrdensServicoMap;
};
export enum ActionEntity {
    FORNECEDOR = 'fornecedores',
    CONTRATO = 'contratos',
    ORDEM_SERVICO = 'ordensServico',
}
export enum ActionType {
    INCLUIR,
    REMOVER,
}

export interface AppDispatch {
    tipo: ActionType;
    entidade: ActionEntity;
    dados: any;
}

const initialState: AppContextStoreType = {fornecedores: {}, contratos: {}, ordensServico: {}};
export const AppContext = createContext<{
    state: AppContextStoreType;
    dispatch: React.Dispatch<AppDispatch>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const AppContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>;
};

/**
 * A reducer function receives two arguments, the first one is the state, that we are passing when
 * using useReducer hook, and the second one is an object that represents that events and some data
 * that will change the state (action).
 * @param state
 * @param acao
 */
const reducer = (state: AppContextStoreType, acao: {tipo: ActionType; entidade: ActionEntity; dados: any}) => {
    const retorno = {...state};
    switch (acao.tipo) {
        case ActionType.INCLUIR:
            //Se você retornar o mesmo valor do Hook Reducer que o valor do state atual, React irá pular a ação sem
            //renderizar os filhos ou disparar os efeitos. (React usa o algoritmo de comparação Object.is.)
            retorno[acao.entidade][acao.dados.id] = acao.dados;
            return retorno;
        case ActionType.REMOVER:
            delete retorno[acao.entidade][acao.dados.id];
            return retorno;
        default:
            return state;
    }
};
