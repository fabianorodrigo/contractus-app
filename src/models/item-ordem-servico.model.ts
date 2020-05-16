import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ITEM_ORDEM_SERVICO',
        },
    },
})
export class ItemOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ITEM_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    idOrdemServico: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_ITEM',
        },
    })
    descricao: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'ID_PRODUTO',
        },
    })
    idProduto?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'SG_METRICA',
        },
    })
    siglaMetrica: string;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'QT_ESTIMADA',
            dataType: 'NUMERIC(10,2)',
        },
    })
    quantidadeEstimada: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'VL_UNITARIO_ESTIMADO',
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorUnitarioEstimado: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'QT_REAL',
            dataType: 'NUMERIC(10,2)',
        },
    })
    quantidadeReal?: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'VL_UNITARIO_REAL',
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorUnitarioReal?: number;

    @property({
        type: 'boolean',
        postgresql: {
            columnName: 'IN_CANCELADO',
        },
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
