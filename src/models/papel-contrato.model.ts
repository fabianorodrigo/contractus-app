import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_PAPEL_CONTRATO',
        },
    },
})
export class PapelContrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_PAPEL_CONTRATO',
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
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_PAPEL',
        },
    })
    idPapel: number;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_INICIO',
        },
    })
    dataInicio: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_FIM',
        },
    })
    dataFim?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_DONO_PAPEL',
        },
    })
    nome: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NR_CPF_DONO_PAPEL',
        },
    })
    cpf?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NR_SIAPE_DONO_PAPEL',
        },
    })
    siape?: string;

    constructor(data?: Partial<PapelContrato>) {
        super(data);
    }
}

export interface PapeisContratoRelations {
    // describe navigational properties here
}

export type PapeisContratoWithRelations = PapelContrato & PapeisContratoRelations;
