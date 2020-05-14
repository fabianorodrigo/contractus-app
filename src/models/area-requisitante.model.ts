import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_AREA_REQUISITANTE',
        },
    },
})
export class AreaRequisitante extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_AREA_REQUISITANTE',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_AREA_REQUISITANTE',
        },
    })
    nomeArea: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'SG_AREA_REQUISITANTE',
        },
    })
    siglaArea: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NR_PROCESSO_ORDENS_SERVICO_SEI',
        },
    })
    numeroProcessoOrdensServicoSEI: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'NR_BLOCO_ASSINATURAS_SEI',
        },
    })
    numeroBlocoAssinaturasSEI?: number;

    constructor(data?: Partial<AreaRequisitante>) {
        super(data);
    }
}

export interface AreaRequisitanteRelations {
    // describe navigational properties here
}

export type AreaRequisitanteWithRelations = AreaRequisitante & AreaRequisitanteRelations;
