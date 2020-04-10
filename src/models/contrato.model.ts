import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Fornecedor} from './fornecedor.model';
import {MetricaContrato} from './metrica-contrato.model';
import {OrdemServico} from './ordem-servico.model';
import {PapelContrato} from './papel-contrato.model';
import {TipoOrdemServicoContrato} from './tipo-ordem-servico-contrato.model';

@model()
export class Contrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
    })
    numeroContrato: number;

    @property({
        type: 'number',
        required: true,
    })
    anoContrato: number;
    @property({
        type: 'date',
        required: true,
    })
    dtInicioVigencia: string;

    @property({
        type: 'date',
    })
    dtFimVigencia?: string;

    @property({
        type: 'date',
    })
    dtAssinatura?: string;

    @property({
        type: 'number',
        required: true,
    })
    numeroProcessoLicitatorio: string;

    @property({
        type: 'string',
    })
    numeroProcessoOrdensServico?: string;

    @property({
        type: 'string',
    })
    numeroProcessoPagamentos?: string;

    @property({
        type: 'number',
    })
    numeroDocumentoSEITermoReferencia?: number;

    @property({
        type: 'number',
    })
    numeroDocumentoSEIContrato?: number;

    @belongsTo(() => Fornecedor, {name: 'fornecedor'})
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
