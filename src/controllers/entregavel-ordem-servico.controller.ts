import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {EntregavelOrdemServico} from '../models';
import {EntregavelOrdemServicoRepository} from '../repositories';

export class EntregavelOrdemServicoController {
  constructor(
    @repository(EntregavelOrdemServicoRepository)
    public entregavelOrdemServicoRepository: EntregavelOrdemServicoRepository,
  ) {}

  @post('/entregavel-ordem-servico', {
    responses: {
      '200': {
        description: 'EntregavelOrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelOrdemServico),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelOrdemServico, {
            title: 'NewEntregavelOrdemServico',
            exclude: ['id'],
          }),
        },
      },
    })
    entregavelOrdemServico: Omit<EntregavelOrdemServico, 'id'>,
  ): Promise<EntregavelOrdemServico> {
    return this.entregavelOrdemServicoRepository.create(entregavelOrdemServico);
  }

  @get('/entregavel-ordem-servico/count', {
    responses: {
      '200': {
        description: 'EntregavelOrdemServico model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EntregavelOrdemServico) where?: Where<EntregavelOrdemServico>,
  ): Promise<Count> {
    return this.entregavelOrdemServicoRepository.count(where);
  }

  @get('/entregavel-ordem-servico', {
    responses: {
      '200': {
        description: 'Array of EntregavelOrdemServico model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EntregavelOrdemServico, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EntregavelOrdemServico)
    filter?: Filter<EntregavelOrdemServico>,
  ): Promise<EntregavelOrdemServico[]> {
    return this.entregavelOrdemServicoRepository.find(filter);
  }

  @patch('/entregavel-ordem-servico', {
    responses: {
      '200': {
        description: 'EntregavelOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelOrdemServico, {partial: true}),
        },
      },
    })
    entregavelOrdemServico: EntregavelOrdemServico,
    @param.where(EntregavelOrdemServico) where?: Where<EntregavelOrdemServico>,
  ): Promise<Count> {
    return this.entregavelOrdemServicoRepository.updateAll(
      entregavelOrdemServico,
      where,
    );
  }

  @get('/entregavel-ordem-servico/{id}', {
    responses: {
      '200': {
        description: 'EntregavelOrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelOrdemServico, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EntregavelOrdemServico, {exclude: 'where'})
    filter?: FilterExcludingWhere<EntregavelOrdemServico>,
  ): Promise<EntregavelOrdemServico> {
    return this.entregavelOrdemServicoRepository.findById(id, filter);
  }

  @patch('/entregavel-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'EntregavelOrdemServico PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelOrdemServico, {partial: true}),
        },
      },
    })
    entregavelOrdemServico: EntregavelOrdemServico,
  ): Promise<void> {
    await this.entregavelOrdemServicoRepository.updateById(
      id,
      entregavelOrdemServico,
    );
  }

  @put('/entregavel-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'EntregavelOrdemServico PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entregavelOrdemServico: EntregavelOrdemServico,
  ): Promise<void> {
    await this.entregavelOrdemServicoRepository.replaceById(
      id,
      entregavelOrdemServico,
    );
  }

  @del('/entregavel-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'EntregavelOrdemServico DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entregavelOrdemServicoRepository.deleteById(id);
  }
}
