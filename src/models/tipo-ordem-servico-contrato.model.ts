import {Entity, hasMany, model, property} from '@loopback/repository';
import {EntregavelTipoOrdemServico} from './entregavel-tipo-ordem-servico.model';
import {IndicadorNiveisServicoContrato} from './indicador-niveis-servico-contrato.model';
import {EtapaTipoOrdemServico} from './etapa-tipo-ordem-servico.model';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_TIPO_ORDEM_SERVICO_CONTRATO',
        },
    },
})
export class TipoOrdemServicoContrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_TIPO_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_CONTRATO',
        },
    })
    idContrato: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_TIPO_ORDEM_SERVICO',
        },
    })
    descricao: string;

    @property({
        type: 'boolean',
        required: true,
        postgresql: {
            columnName: 'IN_TERMO_ACEITACAO_EMITIDO_POR_ETAPA',
        },
    })
    termoAceitacaoEmitidoPorEtapa: boolean;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_TEMPLATE_ORDEM_SERVICO',
        },
    })
    templateOrdemServico?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_TEMPLATE_TERMO_ACEITACAO',
        },
    })
    templateTermoAceitacao?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_TEMPLATE_TRP',
        },
    })
    templateTermoRecebimentoProvisorio?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_TEMPLATE_TRD',
        },
    })
    templateTermoRecebimentoDefinitivo?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'SG_UNIDADE_GARANTIA',
        },
    })
    unidadeGarantia: string;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'NR_TEMPO_GARANTIA',
        },
    })
    tempoGarantia: number;

    @hasMany(() => EntregavelTipoOrdemServico, {
        keyTo: 'idTipoOrdemServicoContrato',
    })
    entregaveis: EntregavelTipoOrdemServico[];

    @hasMany(() => IndicadorNiveisServicoContrato, {
        keyTo: 'idTipoOrdemServicoContrato',
    })
    indicadores: IndicadorNiveisServicoContrato[];

  @hasMany(() => EtapaTipoOrdemServico, {keyTo: 'idTipoOrdemServicoContrato'})
  etapas: EtapaTipoOrdemServico[];

    constructor(data?: Partial<TipoOrdemServicoContrato>) {
        super(data);
    }
}

export interface TiposOrdemServicoContratoRelations {
    // describe navigational properties here
}

export type TiposOrdemServicoContratoWithRelations = TipoOrdemServicoContrato & TiposOrdemServicoContratoRelations;
