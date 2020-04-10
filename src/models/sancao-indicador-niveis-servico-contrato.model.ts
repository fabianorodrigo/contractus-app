import {Entity, model, property} from '@loopback/repository';

@model()
export class SancaoIndicadorNiveisServicoContrato extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  idIndicadorNiveisServicoContrato: number;

  @property({
    type: 'number',
    required: true,
  })
  valorIndicador: number;

  @property({
    type: 'number',
    required: true,
  })
  percentualGlosa: number;

  @property({
    type: 'number',
  })
  idTipoOrdemServicoContrato?: number;

  constructor(data?: Partial<SancaoIndicadorNiveisServicoContrato>) {
    super(data);
  }
}

export interface SancoesIndicadorNiveisServicoContratoRelations {
  // describe navigational properties here
}

export type SancoesIndicadorNiveisServicoContratoWithRelations = SancaoIndicadorNiveisServicoContrato &
  SancoesIndicadorNiveisServicoContratoRelations;
