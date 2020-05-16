import {Entity, model, property} from '@loopback/repository';

@model({ settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_RECEBIMENTO_ORDEM_SERVICO',
        },
    },)
export class RecebimentoOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_RECEBIMENTO_ORDEM_SERVICO',
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
        default: 'P',
        postgresql: {
            columnName: 'IN_TIPO_RECEBIMENTO',
        },
    })
    tipoRecebimento: string;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_RECEBIMENTO',
        },
    })
    dtRecebimento: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_TERMO_RECEBIMENTO_SEI',
        },
    })
    numeroDocumentoTermoRecebimentoSEI?: number;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_LINK_TERMO_RECEBIMENTO_SEI',
        },
    })
    linkTermoRecebimentoSEI?: string;

    constructor(data?: Partial<RecebimentoOrdemServico>) {
        super(data);
    }
}

export interface RecebimentoOrdemServicoRelations {
    // describe navigational properties here
}

export type RecebimentoOrdemServicoWithRelations = RecebimentoOrdemServico & RecebimentoOrdemServicoRelations;
