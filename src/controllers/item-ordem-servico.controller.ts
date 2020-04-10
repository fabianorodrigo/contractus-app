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
import {ItemOrdemServico} from '../models';
import {ItemOrdemServicoRepository} from '../repositories';

export class ItemOrdemServicoController {
  constructor(
    @repository(ItemOrdemServicoRepository)
    public itemOrdemServicoRepository: ItemOrdemServicoRepository,
  ) {}

  @post('/item-ordem-servico', {
    responses: {
      '200': {
        description: 'ItemOrdemServico model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(ItemOrdemServico)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemOrdemServico, {
            title: 'NewItemOrdemServico',
            exclude: ['id'],
          }),
        },
      },
    })
    itemOrdemServico: Omit<ItemOrdemServico, 'id'>,
  ): Promise<ItemOrdemServico> {
    return this.itemOrdemServicoRepository.create(itemOrdemServico);
  }

  @get('/item-ordem-servico/count', {
    responses: {
      '200': {
        description: 'ItemOrdemServico model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ItemOrdemServico) where?: Where<ItemOrdemServico>,
  ): Promise<Count> {
    return this.itemOrdemServicoRepository.count(where);
  }

  @get('/item-ordem-servico', {
    responses: {
      '200': {
        description: 'Array of ItemOrdemServico model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ItemOrdemServico, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ItemOrdemServico) filter?: Filter<ItemOrdemServico>,
  ): Promise<ItemOrdemServico[]> {
    return this.itemOrdemServicoRepository.find(filter);
  }

  @patch('/item-ordem-servico', {
    responses: {
      '200': {
        description: 'ItemOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemOrdemServico, {partial: true}),
        },
      },
    })
    itemOrdemServico: ItemOrdemServico,
    @param.where(ItemOrdemServico) where?: Where<ItemOrdemServico>,
  ): Promise<Count> {
    return this.itemOrdemServicoRepository.updateAll(itemOrdemServico, where);
  }

  @get('/item-ordem-servico/{id}', {
    responses: {
      '200': {
        description: 'ItemOrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ItemOrdemServico, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemOrdemServico, {exclude: 'where'})
    filter?: FilterExcludingWhere<ItemOrdemServico>,
  ): Promise<ItemOrdemServico> {
    return this.itemOrdemServicoRepository.findById(id, filter);
  }

  @patch('/item-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'ItemOrdemServico PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemOrdemServico, {partial: true}),
        },
      },
    })
    itemOrdemServico: ItemOrdemServico,
  ): Promise<void> {
    await this.itemOrdemServicoRepository.updateById(id, itemOrdemServico);
  }

  @put('/item-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'ItemOrdemServico PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemOrdemServico: ItemOrdemServico,
  ): Promise<void> {
    await this.itemOrdemServicoRepository.replaceById(id, itemOrdemServico);
  }

  @del('/item-ordem-servico/{id}', {
    responses: {
      '204': {
        description: 'ItemOrdemServico DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemOrdemServicoRepository.deleteById(id);
  }
}
