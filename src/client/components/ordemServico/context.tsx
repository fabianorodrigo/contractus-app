import React, {createContext, ReactNode, useReducer} from 'react';
import {OrdemServicoFull} from '../../../models';
import {IEntidadeContexto, IEntidadeState} from '../../models/EntidadeContext';
import {criaReducerEntidade} from '../../services/criaReducerEntidade';
import {novaOrdemServico} from './new';

const initialState: IEntidadeState<OrdemServicoFull> = {editando: false, dado: novaOrdemServico()};
export const OrdemServicoContext = createContext<IEntidadeContexto<OrdemServicoFull>>({
    state: initialState,
    dispatch: () => null,
});

export const OrdemServicoContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(criaReducerEntidade<OrdemServicoFull>(novaOrdemServico), initialState);
    return <OrdemServicoContext.Provider value={{state, dispatch}}>{children}</OrdemServicoContext.Provider>;
};

/**
 * A reducer function receives two arguments, the first one is the state, that we are passing when
 * using useReducer hook, and the second one is an object that represents that events and some data
 * that will change the state (action).
 * @param state
 * @param acao
 */
/*function reducer<T>(state: IEntidadeState<T>, acao: IEntidadeDispatch<T>): IEntidadeState<T> {
    switch (acao.tipo) {
        case EditionType.NOVO:
            //Se você retornar o mesmo valor do Hook Reducer que o valor do state atual, React irá pular a ação sem
            //renderizar os filhos ou disparar os efeitos. (React usa o algoritmo de comparação Object.is.)
            return {editando: true, dado: novaOrdemServico()};
        case EditionType.EDITAR:
            return {editando: true, dado: acao.dado};
        case EditionType.FECHAR:
            return {editando: false, dado: novaOrdemServico()};
        default:
            return state;
    }
}
*/
