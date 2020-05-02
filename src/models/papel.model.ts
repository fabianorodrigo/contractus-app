import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_PAPEL',
        },
    },
})
export class Papel extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_PAPEL',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_PAPEL',
        },
    })
    descricao: string;

    constructor(data?: Partial<Papel>) {
        super(data);
    }
}

export interface PapelRelations {
    // describe navigational properties here
}

export type PapelWithRelations = Papel & PapelRelations;
