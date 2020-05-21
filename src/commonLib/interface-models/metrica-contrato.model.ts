export interface IMetricaContrato {
    id?: number;
    idContrato: number;
    sigla: string;
    descricao: string;
    dtInicio: string;
    dtFim?: string;
    valorUnitario: number;
}
