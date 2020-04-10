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
import {TipoOrdemServicoContrato, EntregavelTipoOrdemServico} from '../models';
import {TipoOrdemServicoContratoRepository} from '../repositories';

export class TipoOrdemServicoContratoEntregavelTipoOrdemServicoController {
  constructor(
    @repository(TipoOrdemServicoContratoRepository)
    protected tipoOrdemServicoContratoRepository: TipoOrdemServicoContratoRepository,
  ) {}

  @get('/tipo-ordem-servico-contratoes/{id}/entregavel-tipo-ordem-servicos', {
    responses: {
      '200': {
        description:
          'Array of TipoOrdemServicoContrato has many EntregavelTipoOrdemServico',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EntregavelTipoOrdemServico),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EntregavelTipoOrdemServico>,
  ): Promise<EntregavelTipoOrdemServico[]> {
    return this.tipoOrdemServicoContratoRepository.entregaveis(id).find(filter);
  }

  @post('/tipo-ordem-servico-contratoes/{id}/entregavel-tipo-ordem-servicos', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelTipoOrdemServico),
          },
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoOrdemServicoContrato.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelTipoOrdemServico, {
            title: 'NewEntregavelTipoOrdemServicoInTipoOrdemServicoContrato',
            exclude: ['id'],
            optional: ['idTipoOrdemServicoContrato'],
          }),
        },
      },
    })
    entregavelTipoOrdemServico: Omit<EntregavelTipoOrdemServico, 'id'>,
  ): Promise<EntregavelTipoOrdemServico> {
    return this.tipoOrdemServicoContratoRepository
      .entregaveis(id)
      .create(entregavelTipoOrdemServico);
  }

  @patch('/tipo-ordem-servico-contratoes/{id}/entregavel-tipo-ordem-servicos', {
    responses: {
      '200': {
        description:
          'TipoOrdemServicoContrato.EntregavelTipoOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelTipoOrdemServico, {
            partial: true,
          }),
        },
      },
    })
    entregavelTipoOrdemServico: Partial<EntregavelTipoOrdemServico>,
    @param.query.object('where', getWhereSchemaFor(EntregavelTipoOrdemServico))
    where?: Where<EntregavelTipoOrdemServico>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository
      .entregaveis(id)
      .patch(entregavelTipoOrdemServico, where);
  }

  @del('/tipo-ordem-servico-contratoes/{id}/entregavel-tipo-ordem-servicos', {
    responses: {
      '200': {
        description:
          'TipoOrdemServicoContrato.EntregavelTipoOrdemServico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EntregavelTipoOrdemServico))
    where?: Where<EntregavelTipoOrdemServico>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository
      .entregaveis(id)
      .delete(where);
  }
}
