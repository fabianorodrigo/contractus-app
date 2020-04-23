import React, {createContext, ReactNode, useReducer} from 'react';
import {OrdemServicoFull} from '../../../models';
import {OrdemServicoNova} from './ordemServicoNova';

export enum EditionType {
    INCLUIR,
    EDITAR,
}

const initialState: OrdemServicoFull = OrdemServicoNova;
export const OrdemServicoContext = createContext<{
    state: OrdemServicoFull;
    dispatch: React.Dispatch<{tipo: EditionType; ordemServico: OrdemServicoFull}>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const OrdemServicoContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <OrdemServicoContext.Provider value={{state, dispatch}}>{children}</OrdemServicoContext.Provider>;
};

/**
 * A reducer function receives two arguments, the first one is the state, that we are passing when
 * using useReducer hook, and the second one is an object that represents that events and some data
 * that will change the state (action).
 * @param state
 * @param acao
 */
const reducer = (state: OrdemServicoFull, acao: {tipo: EditionType; ordemServico: OrdemServicoFull}) => {
    switch (acao.tipo) {
        case EditionType.INCLUIR:
            //Se você retornar o mesmo valor do Hook Reducer que o valor do state atual, React irá pular a ação sem
            //renderizar os filhos ou disparar os efeitos. (React usa o algoritmo de comparação Object.is.)
            return OrdemServicoNova;
        case EditionType.EDITAR:
            return acao.ordemServico;
        default:
            return state;
    }
};
