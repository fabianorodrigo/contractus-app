import {IEntregavelRecebimentoOrdemServico} from './entregavel-recebimento-ordem-servico.model';

export interface IRecebimentoOrdemServico {
    id?: number;
    idOrdemServico: number;
    tipoRecebimento: string;
    dtRecebimento: string;
    entregaveis: IEntregavelRecebimentoOrdemServico[];
    numeroDocumentoTermoRecebimentoSEI?: number;
    linkTermoRecebimentoSEI?: string;
}
