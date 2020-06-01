import {IEntregavelTipoOrdemServico} from './entregavel-tipo-ordem-servico.model';
import {IEtapaTipoOrdemServico} from './etapa-tipo-ordem-servico.model';
import {IIndicadorNiveisServicoContrato} from './indicador-niveis-servico-contrato.model';

export interface ITipoOrdemServicoContrato {
    id?: number;
    idContrato: number;
    descricao: string;
    termoAceitacaoEmitidoPorEtapa: boolean;
    templateOrdemServico?: string;
    templateTermoAceitacao?: string;
    templateTermoRecebimentoProvisorio?: string;
    templateTermoRecebimentoDefinitivo?: string;
    unidadeGarantia: string;
    tempoGarantia: number;
    numeroDiasEmissaoTRD: number;
    entregaveis: IEntregavelTipoOrdemServico[];
    indicadores: IIndicadorNiveisServicoContrato[];
    etapas: IEtapaTipoOrdemServico[];
}
