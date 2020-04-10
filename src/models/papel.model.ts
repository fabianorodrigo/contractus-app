import {Entity, model, property} from '@loopback/repository';

@model()
export class Papel extends Entity {
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

  constructor(data?: Partial<Papel>) {
    super(data);
  }
}

export interface PapelRelations {
  // describe navigational properties here
}

export type PapelWithRelations = Papel & PapelRelations;
