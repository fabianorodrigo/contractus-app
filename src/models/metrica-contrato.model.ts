import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_METRICA_CONTRATO',
        },
    },
})
export class MetricaContrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_METRICA_CONTRATO',
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
            columnName: 'SG_METRICA',
        },
    })
    sigla: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_METRICA',
        },
    })
    descricao: string;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_INICIO',
        },
    })
    dtInicio: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_FIM',
        },
    })
    dtFim?: string;

    @property({
        type: 'number',
        required: true,
        scale: 2,
        postgresql: {
            columnName: 'VL_UNITARIO',
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
