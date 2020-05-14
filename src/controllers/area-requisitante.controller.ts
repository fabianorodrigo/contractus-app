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
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {AreaRequisitante} from '../models';
import {AreaRequisitanteRepository} from '../repositories';

export class AreaRequisitanteController {
  constructor(
    @repository(AreaRequisitanteRepository)
    public areaRequisitanteRepository : AreaRequisitanteRepository,
  ) {}

  @post('/areaRequisitante', {
    responses: {
      '200': {
        description: 'AreaRequisitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(AreaRequisitante)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaRequisitante, {
            title: 'NewAreaRequisitante',
            exclude: ['id'],
          }),
        },
      },
    })
    areaRequisitante: Omit<AreaRequisitante, 'id'>,
  ): Promise<AreaRequisitante> {
    return this.areaRequisitanteRepository.create(areaRequisitante);
  }

  @get('/areaRequisitante/count', {
    responses: {
      '200': {
        description: 'AreaRequisitante model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(AreaRequisitante) where?: Where<AreaRequisitante>,
  ): Promise<Count> {
    return this.areaRequisitanteRepository.count(where);
  }

  @get('/areaRequisitante', {
    responses: {
      '200': {
        description: 'Array of AreaRequisitante model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AreaRequisitante, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AreaRequisitante) filter?: Filter<AreaRequisitante>,
  ): Promise<AreaRequisitante[]> {
    return this.areaRequisitanteRepository.find(filter);
  }

  @patch('/areaRequisitante', {
    responses: {
      '200': {
        description: 'AreaRequisitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaRequisitante, {partial: true}),
        },
      },
    })
    areaRequisitante: AreaRequisitante,
    @param.where(AreaRequisitante) where?: Where<AreaRequisitante>,
  ): Promise<Count> {
    return this.areaRequisitanteRepository.updateAll(areaRequisitante, where);
  }

  @get('/areaRequisitante/{id}', {
    responses: {
      '200': {
        description: 'AreaRequisitante model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AreaRequisitante, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AreaRequisitante, {exclude: 'where'}) filter?: FilterExcludingWhere<AreaRequisitante>
  ): Promise<AreaRequisitante> {
    return this.areaRequisitanteRepository.findById(id, filter);
  }

  @patch('/areaRequisitante/{id}', {
    responses: {
      '204': {
        description: 'AreaRequisitante PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaRequisitante, {partial: true}),
        },
      },
    })
    areaRequisitante: AreaRequisitante,
  ): Promise<void> {
    await this.areaRequisitanteRepository.updateById(id, areaRequisitante);
  }

  @put('/areaRequisitante/{id}', {
    responses: {
      '204': {
        description: 'AreaRequisitante PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() areaRequisitante: AreaRequisitante,
  ): Promise<void> {
    await this.areaRequisitanteRepository.replaceById(id, areaRequisitante);
  }

  @del('/areaRequisitante/{id}', {
    responses: {
      '204': {
        description: 'AreaRequisitante DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.areaRequisitanteRepository.deleteById(id);
  }
}
