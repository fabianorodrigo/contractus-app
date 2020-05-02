import {EditionType, IEntidadeDispatch, IEntidadeState, TypeFunctionReducerEntidade} from '../models/EntidadeContext';
/**
 * Retorna uma função Reducer para ser utilizada no ContextProvider de uma entidade do tipo <T> passado
 * Essa função é passada parao React Hook useReducer. Ela tem como entrada o state daquela entidade e uma
 * ação para que o reducer saiba qual ação tomar, e retorna o state atualizado
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
            case EditionType.ATUALIZAR_CONTEXTO:
                return {editando: true, dado: <T>acao.dado};
            case EditionType.FECHAR:
                return {editando: false, dado: funcaoNovaEntidade()};
            default: {
                console.warn('reducer: entrou no default');
                return state;
            }
        }
    }
    return reducer;
}
