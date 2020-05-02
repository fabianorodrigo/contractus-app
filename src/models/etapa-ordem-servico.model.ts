import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ETAPA_ORDEM_SERVICO',
        },
    },
})
export class EtapaOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ETAPA_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_ETAPA',
        },
    })
    descricao: string;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_INICIO_PLANEJADA',
        },
    })
    dtInicioPlanejada: string;

    @property({
        type: 'date',
        required: true,
        postgresql: {
            columnName: 'DT_FIM_PLANEJADA',
        },
    })
    dtFimPlanejada: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_INICIO_REAL',
        },
    })
    dtInicioReal?: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_FIM_REAL',
        },
    })
    dtFimReal?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    idOrdemServico?: number;

    constructor(data?: Partial<EtapaOrdemServico>) {
        super(data);
    }
}

export interface EtapaOrdemServicoRelations {
    // describe navigational properties here
}

export type EtapaOrdemServicoWithRelations = EtapaOrdemServico & EtapaOrdemServicoRelations;
