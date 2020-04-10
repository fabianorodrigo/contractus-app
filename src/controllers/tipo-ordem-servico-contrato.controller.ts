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
import {TipoOrdemServicoContrato} from '../models';
import {TipoOrdemServicoContratoRepository} from '../repositories';

export class TipoOrdemServicoContratoController {
  constructor(
    @repository(TipoOrdemServicoContratoRepository)
    public tipoOrdemServicoContratoRepository: TipoOrdemServicoContratoRepository,
  ) {}

  @post('/tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoOrdemServicoContrato),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOrdemServicoContrato, {
            title: 'NewTipoOrdemServicoContrato',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoOrdemServicoContrato: Omit<TipoOrdemServicoContrato, 'id'>,
  ): Promise<TipoOrdemServicoContrato> {
    return this.tipoOrdemServicoContratoRepository.create(
      tipoOrdemServicoContrato,
    );
  }

  @get('/tipo-ordem-servico-contrato/count', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TipoOrdemServicoContrato)
    where?: Where<TipoOrdemServicoContrato>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository.count(where);
  }

  @get('/tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'Array of TipoOrdemServicoContrato model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TipoOrdemServicoContrato, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TipoOrdemServicoContrato)
    filter?: Filter<TipoOrdemServicoContrato>,
  ): Promise<TipoOrdemServicoContrato[]> {
    return this.tipoOrdemServicoContratoRepository.find(filter);
  }

  @patch('/tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOrdemServicoContrato, {partial: true}),
        },
      },
    })
    tipoOrdemServicoContrato: TipoOrdemServicoContrato,
    @param.where(TipoOrdemServicoContrato)
    where?: Where<TipoOrdemServicoContrato>,
  ): Promise<Count> {
    return this.tipoOrdemServicoContratoRepository.updateAll(
      tipoOrdemServicoContrato,
      where,
    );
  }

  @get('/tipo-ordem-servico-contrato/{id}', {
    responses: {
      '200': {
        description: 'TipoOrdemServicoContrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoOrdemServicoContrato, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoOrdemServicoContrato, {exclude: 'where'})
    filter?: FilterExcludingWhere<TipoOrdemServicoContrato>,
  ): Promise<TipoOrdemServicoContrato> {
    return this.tipoOrdemServicoContratoRepository.findById(id, filter);
  }

  @patch('/tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'TipoOrdemServicoContrato PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOrdemServicoContrato, {partial: true}),
        },
      },
    })
    tipoOrdemServicoContrato: TipoOrdemServicoContrato,
  ): Promise<void> {
    await this.tipoOrdemServicoContratoRepository.updateById(
      id,
      tipoOrdemServicoContrato,
    );
  }

  @put('/tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'TipoOrdemServicoContrato PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoOrdemServicoContrato: TipoOrdemServicoContrato,
  ): Promise<void> {
    await this.tipoOrdemServicoContratoRepository.replaceById(
      id,
      tipoOrdemServicoContrato,
    );
  }

  @del('/tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'TipoOrdemServicoContrato DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoOrdemServicoContratoRepository.deleteById(id);
  }
}
