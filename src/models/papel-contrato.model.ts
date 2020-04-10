import {Entity, model, property} from '@loopback/repository';

@model()
export class PapelContrato extends Entity {
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
  idContrato: number;

  @property({
    type: 'number',
    required: true,
  })
  idPapel: number;

  @property({
    type: 'date',
    required: true,
  })
  dataInicio: string;

  @property({
    type: 'date',
  })
  dataFim?: string;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'number',
  })
  cpf?: number;

  @property({
    type: 'number',
  })
  siape?: number;

  constructor(data?: Partial<PapelContrato>) {
    super(data);
  }
}

export interface PapeisContratoRelations {
  // describe navigational properties here
}

export type PapeisContratoWithRelations = PapelContrato &
  PapeisContratoRelations;
