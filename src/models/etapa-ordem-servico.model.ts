import {Entity, model, property} from '@loopback/repository';

@model()
export class EtapaOrdemServico extends Entity {
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
  descricao: string;

  @property({
    type: 'date',
    required: true,
  })
  dtInicioPlanejada: string;

  @property({
    type: 'date',
    required: true,
  })
  dtFimPlanejada: string;

  @property({
    type: 'date',
  })
  dtInicioReal?: string;

  @property({
    type: 'date',
  })
  dtFimReal?: string;

  @property({
    type: 'number',
  })
  idOrdemServico?: number;

  constructor(data?: Partial<EtapaOrdemServico>) {
    super(data);
  }
}

export interface EtapaOrdemServicoRelations {
  // describe navigational properties here
}

export type EtapaOrdemServicoWithRelations = EtapaOrdemServico &
  EtapaOrdemServicoRelations;
