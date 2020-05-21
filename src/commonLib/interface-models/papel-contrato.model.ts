export interface IPapelContrato {
    id?: number;
    idContrato: number;
    idPapel: number;
    dataInicio: string;
    dataFim?: string;
    nome: string;
    cpf?: string;
    siape?: string;
}
