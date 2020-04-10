import {Entity, model, property} from '@loopback/repository';

@model()
export class MetricaContrato extends Entity {
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
    idContrato: number;

    @property({
        type: 'string',
        required: true,
    })
    sigla: string;

    @property({
        type: 'string',
        required: true,
    })
    descricao: string;

    @property({
        type: 'date',
        required: true,
    })
    dtInicio: string;

    @property({
        type: 'date',
    })
    dtFim?: string;

    @property({
        type: 'number',
        required: true,
        scale: 2,
        postgresql: {
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorUnitario: number;

    constructor(data?: Partial<MetricaContrato>) {
        super(data);
    }
}

export interface MetricasContratoRelations {
    // describe navigational properties here
}

export type MetricasContratoWithRelations = MetricaContrato & MetricasContratoRelations;
