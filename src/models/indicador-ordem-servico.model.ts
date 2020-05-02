import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_INDICADOR_ORDEM_SERVICO',
        },
    },
})
export class IndicadorOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_INDICADOR_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_INDICADOR',
        },
    })
    idIndicadorNivelServicoContrato: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'VL_INDICADOR_APURADO',
        },
    })
    valorIndicadorApurado: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'VL_GLOSA',
        },
    })
    valorGlosa: number;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    idOrdemServico?: number;

    constructor(data?: Partial<IndicadorOrdemServico>) {
        super(data);
    }
}

export interface IndicadorOrdemServicoRelations {
    // describe navigational properties here
}

export type IndicadorOrdemServicoWithRelations = IndicadorOrdemServico & IndicadorOrdemServicoRelations;
