import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO',
        },
    },
})
export class EntregavelRecebimentoOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ENTREGAVEL_RECEBIMENTO_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_RECEBIMENTO_ORDEM_SERVICO',
        },
    })
    idRecebimentoOrdemServico: number;

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
        required: true,
        postgresql: {
            columnName: 'DE_LINK_EVIDENCIA',
        },
    })
    linkEvidencia: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_ORDEM',
        },
    })
    ordem?: number;

    constructor(data?: Partial<EntregavelRecebimentoOrdemServico>) {
        super(data);
    }
}

export interface EntregavelRecebimentoOrdemServicoRelations {
    // describe navigational properties here
}

export type EntregavelRecebimentoOrdemServicoWithRelations = EntregavelRecebimentoOrdemServico &
    EntregavelRecebimentoOrdemServicoRelations;
