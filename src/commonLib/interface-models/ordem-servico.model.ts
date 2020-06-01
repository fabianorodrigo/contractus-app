import {IEntregavelOrdemServico} from './entregavel-ordem-servico.model';

export interface IOrdemServico {
    id?: number;
    idContrato: number;
    numero?: number;
    emergencial: boolean;
    idTipoOrdemServicoContrato: number;
    dtEmissao?: string;
    idProjeto?: string;
    idProduto?: string;
    idAreaRequisitante: number;
    cpfRequisitante?: string;
    nomeRequisitante: string;
    cpfFiscalTecnico?: string;
    nomeFiscalTecnico: string;
    numeroDocumentoOrdemServicoSEI?: number;
    linkOrdemServicoSEI?: string;
    dtCancelamento?: string;
    itens: object[];
    etapas: object[];
    entregaveis: IEntregavelOrdemServico[];
    indicadores?: object[];
}
