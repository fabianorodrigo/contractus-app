export interface RetornoPermisao {
    ok: boolean;
    mensagensAtributo?: {
        [key: string]: string[];
    }; //coleção de mensagens por atributo
}
