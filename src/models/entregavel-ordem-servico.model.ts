import {Entity, model, property} from '@loopback/repository';

@model()
export class EntregavelOrdemServico extends Entity {
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
    type: 'string',
  })
  linkEvidencia?: string;

  @property({
    type: 'number',
  })
  ordem?: number;

  @property({
    type: 'number',
  })
  idOrdemServico?: number;

  constructor(data?: Partial<EntregavelOrdemServico>) {
    super(data);
  }
}

export interface EntregavelOrdemServicoRelations {
  // describe navigational properties here
}

export type EntregavelOrdemServicoWithRelations = EntregavelOrdemServico &
  EntregavelOrdemServicoRelations;
