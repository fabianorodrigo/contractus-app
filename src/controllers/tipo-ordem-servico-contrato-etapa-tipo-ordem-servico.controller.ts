import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoOrdemServicoContrato,
  EtapaTipoOrdemServico,
} from '../models';
import {TipoOrdemServicoContratoRepository} from '../repositories';

export class TipoOrdemServicoContratoEtapaTipoOrdemServicoController {
  constructor(
    @repository(TipoOrdemServicoContratoRepository) protected tipoOrdemServicoContratoRepository: TipoOrdemServicoContratoRepository,
  ) { }

  @get('/tipo-ordem-servico-contratoes/{id}/etapa-tipo-ordem-servicos', {
    responses: {
      '200': {
        description: 'Array of TipoOrdemServicoContrato has many EtapaTipoOrdemServico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EtapaTipoOrdemServico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EtapaTipoOrdemServico>,
  ): Promise<EtapaTipoOrdemServico[]> {
    return this.tipoOrdemServicoContratoRepository.etapas(id).find(filter);
  }

  @post('/tipo-ordem-servico-contratoes/{id}/etapa-tipo-ordem-servicos', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato model instance',
        content: {'application/json': {schema: getModelSchemaRef(EtapaTipoOrdemServico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoOrdemServicoContrato.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EtapaTipoOrdemServico, {
            title: 'NewEtapaTipoOrdemServicoInTipoOrdemServicoContrato',
            exclude: ['id'],
            optional: ['idTipoOrdemServicoContrato']
          }),
        },
      },
    }) etapaTipoOrdemServico: Omit<EtapaTipoOrdemServico, 'id'>,
  ): Promise<EtapaTipoOrdemServico> {
    return this.tipoOrdemServicoContratoRepository.etapas(id).create(etapaTipoOrdemServico);
  }

  @patch('/tipo-ordem-servico-contratoes/{id}/etapa-tipo-ordem-servicos', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato.EtapaTipoOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EtapaTipoOrdemServico, {partial: true}),
        },
      },
    })
    etapaTipoOrdemServico: Partial<EtapaTipoOrdemServico>,
    @param.query.object('where', getWhereSchemaFor(EtapaTipoOrdemServico)) where?: Where<EtapaTipoOrdemServico>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository.etapas(id).patch(etapaTipoOrdemServico, where);
  }

  @del('/tipo-ordem-servico-contratoes/{id}/etapa-tipo-ordem-servicos', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato.EtapaTipoOrdemServico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EtapaTipoOrdemServico)) where?: Where<EtapaTipoOrdemServico>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository.etapas(id).delete(where);
  }
}
