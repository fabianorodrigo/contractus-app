import {Entity, model, property} from '@loopback/repository';

@model()
export class ItemOrdemServico extends Entity {
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
    idOrdemServico: number;

    @property({
        type: 'string',
        required: true,
    })
    descricao: string;

    @property({
        type: 'string',
        required: true,
    })
    siglaMetrica: string;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            dataType: 'NUMERIC(10,2)',
        },
    })
    quantidadeEstimada: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorUnitarioEstimado: number;

    @property({
        type: 'number',
        postgresql: {
            dataType: 'NUMERIC(10,2)',
        },
    })
    quantidadeReal?: number;

    @property({
        type: 'number',
        postgresql: {
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorUnitarioReal?: number;

    @property({
        type: 'boolean',
    })
    itemCancelado?: boolean;

    constructor(data?: Partial<ItemOrdemServico>) {
        super(data);
    }
}

export interface ItemOrdemServicoRelations {
    // describe navigational properties here
}

export type ItemOrdemServicoWithRelations = ItemOrdemServico & ItemOrdemServicoRelations;
