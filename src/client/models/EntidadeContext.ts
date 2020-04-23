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
