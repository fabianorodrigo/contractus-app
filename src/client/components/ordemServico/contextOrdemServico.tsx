import React, {createContext, ReactNode, useReducer} from 'react';
import {IOrdemServico} from '../../../commonLib/interface-models';
import {IEntidadeContexto, IEntidadeState} from '../../models/EntidadeContext';
import {criaReducerEntidade} from '../../services/criaReducerEntidade';
import {novaOrdemServico} from './new';

const initialState: IEntidadeState<IOrdemServico> = {editando: false, dado: novaOrdemServico()};
export const OrdemServicoContext = createContext<IEntidadeContexto<IOrdemServico>>({
    state: initialState,
    dispatch: () => null,
});

export const OrdemServicoContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(criaReducerEntidade<IOrdemServico>(novaOrdemServico), initialState);
    return <OrdemServicoContext.Provider value={{state, dispatch}}>{children}</OrdemServicoContext.Provider>;
};
