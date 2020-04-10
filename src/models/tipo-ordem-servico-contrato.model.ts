import {Entity, model, property, hasMany} from '@loopback/repository';
import {EntregavelTipoOrdemServico} from './entregavel-tipo-ordem-servico.model';
import {IndicadorNiveisServicoContrato} from './indicador-niveis-servico-contrato.model';

@model()
export class TipoOrdemServicoContrato extends Entity {
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
    type: 'string',
    required: true,
  })
  descricao: string;

  @property({
    type: 'boolean',
    required: true,
  })
  termoAceitacaoEmitidoPorEtapa: boolean;

  @property({
    type: 'string',
  })
  templateOrdemServico?: string;

  @property({
    type: 'string',
  })
  templateTermoAceitacao?: string;

  @property({
    type: 'string',
  })
  templateTermoRecebimentoProvisorio?: string;

  @property({
    type: 'string',
  })
  templateTermoRecebimentoDefinitivo?: string;

  @property({
    type: 'string',
    required: true,
  })
  unidadeGarantia: string;

  @property({
    type: 'number',
    required: true,
  })
  tempoGarantia: number;

  @hasMany(() => EntregavelTipoOrdemServico, {
    keyTo: 'idTipoOrdemServicoContrato',
  })
  entregaveis: EntregavelTipoOrdemServico[];

  @hasMany(() => IndicadorNiveisServicoContrato, {
    keyTo: 'idTipoOrdemServicoContrato',
  })
  indicadores: IndicadorNiveisServicoContrato[];

  constructor(data?: Partial<TipoOrdemServicoContrato>) {
    super(data);
  }
}

export interface TiposOrdemServicoContratoRelations {
  // describe navigational properties here
}

export type TiposOrdemServicoContratoWithRelations = TipoOrdemServicoContrato &
  TiposOrdemServicoContratoRelations;
