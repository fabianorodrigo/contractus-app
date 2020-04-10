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
import {IndicadorNiveisServicoContrato} from '../models';
import {IndicadorNiveisServicoContratoRepository} from '../repositories';

export class IndicadorNiveisServicoContratoController {
  constructor(
    @repository(IndicadorNiveisServicoContratoRepository)
    public indicadorNiveisServicoContratoRepository: IndicadorNiveisServicoContratoRepository,
  ) {}

  @post('/indicador-niveis-servico-contrato', {
    responses: {
      '200': {
        description: 'IndicadorNiveisServicoContrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndicadorNiveisServicoContrato),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
            title: 'NewIndicadorNiveisServicoContrato',
            exclude: ['id'],
          }),
        },
      },
    })
    indicadorNiveisServicoContrato: Omit<IndicadorNiveisServicoContrato, 'id'>,
  ): Promise<IndicadorNiveisServicoContrato> {
    return this.indicadorNiveisServicoContratoRepository.create(
      indicadorNiveisServicoContrato,
    );
  }

  @get('/indicador-niveis-servico-contrato/count', {
    responses: {
      '200': {
        description: 'IndicadorNiveisServicoContrato model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(IndicadorNiveisServicoContrato)
    where?: Where<IndicadorNiveisServicoContrato>,
  ): Promise<Count> {
    return this.indicadorNiveisServicoContratoRepository.count(where);
  }

  @get('/indicador-niveis-servico-contrato', {
    responses: {
      '200': {
        description: 'Array of IndicadorNiveisServicoContrato model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(IndicadorNiveisServicoContrato, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(IndicadorNiveisServicoContrato)
    filter?: Filter<IndicadorNiveisServicoContrato>,
  ): Promise<IndicadorNiveisServicoContrato[]> {
    return this.indicadorNiveisServicoContratoRepository.find(filter);
  }

  @patch('/indicador-niveis-servico-contrato', {
    responses: {
      '200': {
        description: 'IndicadorNiveisServicoContrato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
            partial: true,
          }),
        },
      },
    })
    indicadorNiveisServicoContrato: IndicadorNiveisServicoContrato,
    @param.where(IndicadorNiveisServicoContrato)
    where?: Where<IndicadorNiveisServicoContrato>,
  ): Promise<Count> {
    return this.indicadorNiveisServicoContratoRepository.updateAll(
      indicadorNiveisServicoContrato,
      where,
    );
  }

  @get('/indicador-niveis-servico-contrato/{id}', {
    responses: {
      '200': {
        description: 'IndicadorNiveisServicoContrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(IndicadorNiveisServicoContrato, {exclude: 'where'})
    filter?: FilterExcludingWhere<IndicadorNiveisServicoContrato>,
  ): Promise<IndicadorNiveisServicoContrato> {
    return this.indicadorNiveisServicoContratoRepository.findById(id, filter);
  }

  @patch('/indicador-niveis-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'IndicadorNiveisServicoContrato PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
            partial: true,
          }),
        },
      },
    })
    indicadorNiveisServicoContrato: IndicadorNiveisServicoContrato,
  ): Promise<void> {
    await this.indicadorNiveisServicoContratoRepository.updateById(
      id,
      indicadorNiveisServicoContrato,
    );
  }

  @put('/indicador-niveis-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'IndicadorNiveisServicoContrato PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody()
    indicadorNiveisServicoContrato: IndicadorNiveisServicoContrato,
  ): Promise<void> {
    await this.indicadorNiveisServicoContratoRepository.replaceById(
      id,
      indicadorNiveisServicoContrato,
    );
  }

  @del('/indicador-niveis-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'IndicadorNiveisServicoContrato DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.indicadorNiveisServicoContratoRepository.deleteById(id);
  }
}
