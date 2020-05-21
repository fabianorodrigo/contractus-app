export interface IItemOrdemServico {
    id?: number;
    idOrdemServico: number;
    descricao: string;
    idProduto?: string;
    siglaMetrica: string;
    quantidadeEstimada: number;
    valorUnitarioEstimado: number;
    quantidadeReal?: number;
    valorUnitarioReal?: number;
    itemCancelado?: boolean;
}
