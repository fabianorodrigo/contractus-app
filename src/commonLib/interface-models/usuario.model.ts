export interface IUsuario {
    id: string | string[] | Buffer | Buffer[];
    nomeCompleto: string;
    login: string;
    email: string;
    token: string;
}
