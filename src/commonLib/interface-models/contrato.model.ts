import {IMetricaContrato, IPapelContrato, ITipoOrdemServicoContrato} from '.';

export interface IContrato {
    id?: number;
    numeroContrato: number;
    anoContrato: number;
    dtInicioVigencia: string;
    dtFimVigencia?: string;
    dtAssinatura?: string;
    numeroProcessoLicitatorio: string;
    numeroProcessoPagamentos?: string;
    numeroDocumentoSEITermoReferencia?: number;
    numeroDocumentoSEIContrato?: number;
    idFornecedor: number;
    papeis: IPapelContrato[];
    metricas: IMetricaContrato[];
    tiposOrdemServico: ITipoOrdemServicoContrato[];
}
