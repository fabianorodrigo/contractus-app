import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ETAPA_TIPO_ORDEM_SERVICO_CONTRATO',
        },
    },
})
export class EtapaTipoOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ETAPA_TIPO_ORDEM_SERVICO',
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
            columnName: 'DE_ETAPA',
        },
    })
    descricao: string;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'NR_DIAS_UTEIS_DURACAO',
        },
    })
    numeroDiasUteisDuracao: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_ORDEM',
        },
    })
    ordem?: number;

    constructor(data?: Partial<EtapaTipoOrdemServico>) {
        super(data);
    }
}

export interface EtapaTipoOrdemServicoRelations {
    // describe navigational properties here
}

export type EtapaTipoOrdemServicoWithRelations = EtapaTipoOrdemServico & EtapaTipoOrdemServicoRelations;
