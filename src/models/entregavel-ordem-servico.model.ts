import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ENTREGAVEL_ORDEM_SERVICO',
        },
    },
})
export class EntregavelOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ENTREGAVEL_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_ENTREGAVEL',
        },
    })
    descricao: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_LINK_EVIDENCIA',
        },
    })
    linkEvidencia?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_ORDEM',
        },
    })
    ordem?: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    idOrdemServico?: number;

    constructor(data?: Partial<EntregavelOrdemServico>) {
        super(data);
    }
}

export interface EntregavelOrdemServicoRelations {
    // describe navigational properties here
}

export type EntregavelOrdemServicoWithRelations = EntregavelOrdemServico & EntregavelOrdemServicoRelations;
