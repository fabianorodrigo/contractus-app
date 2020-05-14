import {Entity, hasMany, model, property} from '@loopback/repository';
import {MetricaContrato} from './metrica-contrato.model';
import {OrdemServico} from './ordem-servico.model';
import {PapelContrato} from './papel-contrato.model';
import {TipoOrdemServicoContrato} from './tipo-ordem-servico-contrato.model';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_CONTRATO',
        },
    },
})
export class Contrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_CONTRATO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'NR_CONTRATO',
        },
    })
    numeroContrato: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'NR_ANO_CONTRATO',
        },
    })
    anoContrato: number;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_INICIO_VIGENCIA',
        },
    })
    dtInicioVigencia: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_FIM_VIGENCIA',
        },
    })
    dtFimVigencia?: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_ASSINATURA',
        },
    })
    dtAssinatura?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NR_PROCESSO_LICITACAO',
        },
    })
    numeroProcessoLicitatorio: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NR_PROCESSO_PAGAMENTOS',
        },
    })
    numeroProcessoPagamentos?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_TERMO_REFERENCIA_SEI',
        },
    })
    numeroDocumentoSEITermoReferencia?: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_CONTRATO_SEI',
        },
    })
    numeroDocumentoSEIContrato?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_FORNECEDOR',
        },
    })
    idFornecedor: number;

    @hasMany(() => PapelContrato, {keyTo: 'idContrato'})
    papeis: PapelContrato[];

    @hasMany(() => MetricaContrato, {keyTo: 'idContrato'})
    metricas: MetricaContrato[];

    @hasMany(() => TipoOrdemServicoContrato, {keyTo: 'idContrato'})
    tiposOrdemServico: TipoOrdemServicoContrato[];

    @hasMany(() => OrdemServico, {keyTo: 'idContrato'})
    ordensServico: OrdemServico[];

    constructor(data?: Partial<Contrato>) {
        super(data);
    }
}

export interface ContratoRelations {
    // describe navigational properties here
}

export type ContratoWithRelations = Contrato & ContratoRelations;
