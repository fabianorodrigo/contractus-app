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
import {OrdemServico, EntregavelOrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

export class OrdemServicoEntregavelOrdemServicoController {
  constructor(
    @repository(OrdemServicoRepository)
    protected ordemServicoRepository: OrdemServicoRepository,
  ) {}

  @get('/ordem-servicos/{id}/entregavel-ordem-servicos', {
    responses: {
      '200': {
        description: 'Array of OrdemServico has many EntregavelOrdemServico',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EntregavelOrdemServico),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EntregavelOrdemServico>,
  ): Promise<EntregavelOrdemServico[]> {
    return this.ordemServicoRepository.entregaveis(id).find(filter);
  }

  @post('/ordem-servicos/{id}/entregavel-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelOrdemServico),
          },
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OrdemServico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelOrdemServico, {
            title: 'NewEntregavelOrdemServicoInOrdemServico',
            exclude: ['id'],
            optional: ['idOrdemServico'],
          }),
        },
      },
    })
    entregavelOrdemServico: Omit<EntregavelOrdemServico, 'id'>,
  ): Promise<EntregavelOrdemServico> {
    return this.ordemServicoRepository
      .entregaveis(id)
      .create(entregavelOrdemServico);
  }

  @patch('/ordem-servicos/{id}/entregavel-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.EntregavelOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelOrdemServico, {partial: true}),
        },
      },
    })
    entregavelOrdemServico: Partial<EntregavelOrdemServico>,
    @param.query.object('where', getWhereSchemaFor(EntregavelOrdemServico))
    where?: Where<EntregavelOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository
      .entregaveis(id)
      .patch(entregavelOrdemServico, where);
  }

  @del('/ordem-servicos/{id}/entregavel-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.EntregavelOrdemServico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EntregavelOrdemServico))
    where?: Where<EntregavelOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository.entregaveis(id).delete(where);
  }
}
