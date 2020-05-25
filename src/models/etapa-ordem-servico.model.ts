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
        postgresql: {
            columnName: 'DT_INICIO_PLANEJADA',
        },
    })
    dtInicioPlanejada?: string;

    @property({
        type: 'date',
        postgresql: {
            columnName: 'DT_FIM_PLANEJADA',
        },
    })
    dtFimPlanejada?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'VL_ADIANTAMENTO_PLANEJADO',
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorAdiantamentoPlanejado?: number;

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
            columnName: 'VL_ADIANTAMENTO_REAL',
            dataType: 'NUMERIC(10,2)',
        },
    })
    valorAdiantamentoReal?: number;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'IN_RESULTADO_ETAPA',
        },
    })
    idResultadoEtapa?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    idOrdemServico?: number;

    @property({
        type: 'number',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'NR_TERMO_ACEITACAO_SEI',
        },
    })
    numeroDocumentoTermoAceitacaoSEI?: number;

    @property({
        type: 'string',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'DE_LINK_TERMO_ACEITACAO_SEI',
        },
    })
    linkTermoAceitacaoSEI?: string;

    @property({
        type: 'date',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'DT_CANCELAMENTO',
        },
    })
    dtCancelamento?: string;

    constructor(data?: Partial<EtapaOrdemServico>) {
        super(data);
    }
}

export interface EtapaOrdemServicoRelations {
    // describe navigational properties here
}

export type EtapaOrdemServicoWithRelations = EtapaOrdemServico & EtapaOrdemServicoRelations;
