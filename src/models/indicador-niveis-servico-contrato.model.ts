import {Entity, model, property, hasMany} from '@loopback/repository';
import {SancaoIndicadorNiveisServicoContrato} from './sancao-indicador-niveis-servico-contrato.model';

@model()
export class IndicadorNiveisServicoContrato extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  sigla: string;

  @property({
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'string',
  })
  formula?: string;

  @property({
    type: 'number',
  })
  idTipoOrdemServicoContrato?: number;

  @hasMany(() => SancaoIndicadorNiveisServicoContrato, {
    keyTo: 'idTipoOrdemServicoContrato',
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
