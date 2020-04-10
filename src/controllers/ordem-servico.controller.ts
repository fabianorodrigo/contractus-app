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
import {OrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

export class OrdemServicoController {
  constructor(
    @repository(OrdemServicoRepository)
    public ordemServicoRepository: OrdemServicoRepository,
  ) {}

  @post('/ordem-servico', {
    responses: {
      '200': {
        description: 'OrdemServico model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(OrdemServico)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemServico, {
            title: 'NewOrdemServico',
            exclude: ['id'],
          }),
        },
      },
    })
    ordemServico: Omit<OrdemServico, 'id'>,
  ): Promise<OrdemServico> {
    return this.ordemServicoRepository.create(ordemServico);
  }

  @get('/ordem-servico/count', {
    responses: {
      '200': {
        description: 'OrdemServico model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrdemServico) where?: Where<OrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository.count(where);
  }

  @get('/ordem-servico', {
    responses: {
      '200': {
        description: 'Array of OrdemServico model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrdemServico, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrdemServico) filter?: Filter<OrdemServico>,
  ): Promise<OrdemServico[]> {
    return this.ordemServicoRepository.find(filter);
  }

  @patch('/ordem-servico', {
    responses: {
      '200': {
        description: 'OrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemServico, {partial: true}),
        },
      },
    })
    ordemServico: OrdemServico,
    @param.where(OrdemServico) where?: Where<OrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository.updateAll(ordemServico, where);
  }

  @get('/ordem-servico/{id}', {
    responses: {
      '200': {
        description: 'OrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrdemServico, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrdemServico, {exclude: 'where'})
    filter?: FilterExcludingWhere<OrdemServico>,
  ): Promise<OrdemServico> {
    return this.ordemServicoRepository.findById(id, filter);
  }

  @patch('/ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'OrdemServico PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemServico, {partial: true}),
        },
      },
    })
    ordemServico: OrdemServico,
  ): Promise<void> {
    await this.ordemServicoRepository.updateById(id, ordemServico);
  }

  @put('/ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'OrdemServico PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ordemServico: OrdemServico,
  ): Promise<void> {
    await this.ordemServicoRepository.replaceById(id, ordemServico);
  }

  @del('/ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'OrdemServico DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ordemServicoRepository.deleteById(id);
  }
}
