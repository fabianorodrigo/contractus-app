import {Entity, hasMany, model, property} from '@loopback/repository';
import {SancaoIndicadorNiveisServicoContrato} from './sancao-indicador-niveis-servico-contrato.model';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_INDICADOR_TIPO_ORDEM_SERVICO',
        },
    },
})
export class IndicadorNiveisServicoContrato extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_INDICADOR',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'SG_INDICADOR',
        },
    })
    sigla: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'DE_INDICADOR',
        },
    })
    descricao: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'DE_FORMULA_INDICADOR',
        },
    })
    formula?: string;

    @property({
        type: 'number',
        postgresql: {
            columnName: 'ID_TIPO_ORDEM_SERVICO',
        },
    })
    idTipoOrdemServicoContrato?: number;

    @hasMany(() => SancaoIndicadorNiveisServicoContrato, {
        keyTo: 'idIndicadorNiveisServicoContrato',
    })
    sancoes: SancaoIndicadorNiveisServicoContrato[];

    constructor(data?: Partial<IndicadorNiveisServicoContrato>) {
        super(data);
    }
}

export interface IndicadoresNiveisServicoContratoRelations {
    // describe navigational properties here
}

export type IndicadoresNiveisServicoContratoWithRelations = IndicadorNiveisServicoContrato &
    IndicadoresNiveisServicoContratoRelations;
