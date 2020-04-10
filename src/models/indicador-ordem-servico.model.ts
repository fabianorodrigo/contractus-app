import {Entity, model, property} from '@loopback/repository';

@model()
export class IndicadorOrdemServico extends Entity {
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
  idIndicadorNivelServicoContrato: number;

  @property({
    type: 'number',
    required: true,
  })
  valorIndicadorApurado: number;

  @property({
    type: 'number',
    required: true,
  })
  valorGlosa: number;

  @property({
    type: 'number',
  })
  idOrdemServico?: number;

  constructor(data?: Partial<IndicadorOrdemServico>) {
    super(data);
  }
}

export interface IndicadorOrdemServicoRelations {
  // describe navigational properties here
}

export type IndicadorOrdemServicoWithRelations = IndicadorOrdemServico &
  IndicadorOrdemServicoRelations;
