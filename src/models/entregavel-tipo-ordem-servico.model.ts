import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ENTREGAVEL_TIPO_ORDEM_SERVICO_CONTRATO',
        },
    },
})
export class EntregavelTipoOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ENTREGAVEL_TIPO_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_TIPO_ORDEM_SERVICO',
        },
    })
    idTipoOrdemServicoContrato: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_ENTREGAVEL',
        },
    })
    descricao: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_ORDEM',
        },
    })
    ordem?: number;

    constructor(data?: Partial<EntregavelTipoOrdemServico>) {
        super(data);
    }
}

export interface EntregaveisTipoOrdemServicoRelations {
    // describe navigational properties here
}

export type EntregaveisTipoOrdemServicoWithRelations = EntregavelTipoOrdemServico &
    EntregaveisTipoOrdemServicoRelations;
