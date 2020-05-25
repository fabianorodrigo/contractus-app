import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_SANCAO_INDICADOR_CONTRATO',
        },
    },
})
export class SancaoIndicadorNiveisServicoContrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_SANCAO_INDICADOR_CONTRATO',
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
    idIndicadorNiveisServicoContrato: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'VL_INDICADOR',
        },
    })
    valorIndicador: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'VL_PERCENTUAL_GLOSA',
        },
    })
    percentualGlosa: number;

    constructor(data?: Partial<SancaoIndicadorNiveisServicoContrato>) {
        super(data);
    }
}

export interface SancoesIndicadorNiveisServicoContratoRelations {
    // describe navigational properties here
}

export type SancoesIndicadorNiveisServicoContratoWithRelations = SancaoIndicadorNiveisServicoContrato &
    SancoesIndicadorNiveisServicoContratoRelations;
