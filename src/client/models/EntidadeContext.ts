export enum EditionType {
    NOVO,
    EDITAR,
    SETAR_STATUS, //Alguma ação que esteja vinculado ao atributo status do IEntidadeState
    ATUALIZAR_CONTEXTO,
    FECHAR,
}

export interface IEntidadeState<T> {
    editando: boolean;
    dado: T;
    status?: {[status: string]: boolean}; //utilizado para abarcar outras situações além da edição
}

export interface IEntidadeDispatch<T> {
    tipo: EditionType;
    dado?: T;
    status?: {[status: string]: boolean};
}

export interface IEntidadeContexto<T> {
    state: IEntidadeState<T>;
    dispatch: React.Dispatch<IEntidadeDispatch<T>>;
}

export type TypeFunctionReducerEntidade<T> = (
    state: IEntidadeState<T>,
    acao: IEntidadeDispatch<T>,
    status?: {[status: string]: boolean},
) => IEntidadeState<T>;
