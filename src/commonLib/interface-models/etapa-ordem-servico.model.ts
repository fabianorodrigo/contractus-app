export interface IEtapaOrdemServico {
    id?: number;
    descricao: string;
    dtInicioPlanejada: string;
    dtFimPlanejada: string;
    valorAdiantamentoPlanejado?: number;
    dtInicioReal?: string;
    dtFimReal?: string;
    valorAdiantamentoReal?: number;
    idResultadoEtapa?: string;
    idOrdemServico?: number;
    numeroDocumentoTermoAceitacaoSEI?: number;
    linkTermoAceitacaoSEI?: string;
    dtCancelamento?: string;
}
