import {Entity, model, property} from '@loopback/repository';

@model()
export class Fornecedor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: 'bigint',
    },
  })
  cnpj: number;

  @property({
    type: 'string',
    required: true,
  })
  razaoSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  apelido: string;

  @property({
    type: 'string',
  })
  endereco?: string;

  @property({
    type: 'string',
  })
  bairro?: string;

  @property({
    type: 'string',
  })
  cidade?: string;

  @property({
    type: 'string',
  })
  uf?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  telefone?: string;

  constructor(data?: Partial<Fornecedor>) {
    super(data);
  }
}

export interface FornecedorRelations {
  // describe navigational properties here
}

export type FornecedorWithRelations = Fornecedor & FornecedorRelations;
