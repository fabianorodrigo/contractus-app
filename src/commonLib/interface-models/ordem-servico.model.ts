export interface IOrdemServico {
    id?: number;
    idContrato: number;
    numero?: number;
    emergencial: boolean;
    idTipoOrdemServicoContrato: number;
    dtEmissao?: string;
    idProjeto?: string;
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
    entregaveis: object[];
    indicadores?: object[];
}
