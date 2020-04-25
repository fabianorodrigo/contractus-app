export enum EditionType {
    NOVO,
    EDITAR,
    ATUALIZAR_CONTEXTO,
    FECHAR,
}

export interface IEntidadeState<T> {
    editando: boolean;
    dado: T;
}

export interface IEntidadeDispatch<T> {
    tipo: EditionType;
    dado?: T;
}

export interface IEntidadeContexto<T> {
    state: IEntidadeState<T>;
    dispatch: React.Dispatch<IEntidadeDispatch<T>>;
}

export type TypeFunctionReducerEntidade<T> = (
    state: IEntidadeState<T>,
    acao: IEntidadeDispatch<T>,
) => IEntidadeState<T>;

/**
 *
 * @param funcaoNovaEntidade Funcao que gera uma instãncia vazia da entidade para a qual se está obtendo o reducer
 */
export function criaReducerEntidade<T>(funcaoNovaEntidade: Function): TypeFunctionReducerEntidade<T> {
    /**
     * A reducer function receives two arguments, the first one is the state, that we are passing when
     * using useReducer hook, and the second one is an object that represents that events and some data
     * that will change the state (action).
     * @param state
     * @param acao
     */
    function reducer<T>(state: IEntidadeState<T>, acao: IEntidadeDispatch<T>): IEntidadeState<T> {
        switch (acao.tipo) {
            case EditionType.NOVO:
                //Se você retornar o mesmo valor do Hook Reducer que o valor do state atual, React irá pular a ação sem
                //renderizar os filhos ou disparar os efeitos. (React usa o algoritmo de comparação Object.is.)
                return {editando: true, dado: funcaoNovaEntidade()};
            case EditionType.EDITAR:
                return {editando: true, dado: <T>acao.dado};
            case EditionType.FECHAR:
                return {editando: false, dado: funcaoNovaEntidade()};
            default:
                return state;
        }
    }

    return reducer;
}
