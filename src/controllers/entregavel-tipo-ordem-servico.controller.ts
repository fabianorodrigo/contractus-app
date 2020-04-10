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
import {EntregavelTipoOrdemServico} from '../models';
import {EntregavelTipoOrdemServicoRepository} from '../repositories';

export class EntregavelTipoOrdemServicoController {
  constructor(
    @repository(EntregavelTipoOrdemServicoRepository)
    public entregavelTipoOrdemServicoRepository: EntregavelTipoOrdemServicoRepository,
  ) {}

  @post('/entregavel-tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'EntregavelTipoOrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelTipoOrdemServico),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelTipoOrdemServico, {
            title: 'NewEntregavelTipoOrdemServico',
            exclude: ['id'],
          }),
        },
      },
    })
    entregavelTipoOrdemServico: Omit<EntregavelTipoOrdemServico, 'id'>,
  ): Promise<EntregavelTipoOrdemServico> {
    return this.entregavelTipoOrdemServicoRepository.create(
      entregavelTipoOrdemServico,
    );
  }

  @get('/entregavel-tipo-ordem-servico-contrato/count', {
    responses: {
      '200': {
        description: 'EntregavelTipoOrdemServico model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EntregavelTipoOrdemServico)
    where?: Where<EntregavelTipoOrdemServico>,
  ): Promise<Count> {
    return this.entregavelTipoOrdemServicoRepository.count(where);
  }

  @get('/entregavel-tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'Array of EntregavelTipoOrdemServico model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EntregavelTipoOrdemServico, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EntregavelTipoOrdemServico)
    filter?: Filter<EntregavelTipoOrdemServico>,
  ): Promise<EntregavelTipoOrdemServico[]> {
    return this.entregavelTipoOrdemServicoRepository.find(filter);
  }

  @patch('/entregavel-tipo-ordem-servico-contrato', {
    responses: {
      '200': {
        description: 'EntregavelTipoOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EntregavelTipoOrdemServico, {
            partial: true,
          }),
        },
      },
    })
    entregavelTipoOrdemServico: EntregavelTipoOrdemServico,
    @param.where(EntregavelTipoOrdemServico)
    where?: Where<EntregavelTipoOrdemServico>,
  ): Promise<Count> {
    return this.entregavelTipoOrdemServicoRepository.updateAll(
      entregavelTipoOrdemServico,
      where,
    );
  }

  @get('/entregavel-tipo-ordem-servico-contrato/{id}', {
    responses: {
      '200': {
        description: 'EntregavelTipoOrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EntregavelTipoOrdemServico, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EntregavelTipoOrdemServico, {exclude: 'where'})
    filter?: FilterExcludingWhere<EntregavelTipoOrdemServico>,
  ): Promise<EntregavelTipoOrdemServico> {
    return this.entregavelTipoOrdemServicoRepository.findById(id, filter);
  }

  @patch('/entregavel-tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'EntregavelTipoOrdemServico PATCH success',
      },
    },
  })
  async updateById(
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
    entregavelTipoOrdemServico: EntregavelTipoOrdemServico,
  ): Promise<void> {
    await this.entregavelTipoOrdemServicoRepository.updateById(
      id,
      entregavelTipoOrdemServico,
    );
  }

  @put('/entregavel-tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'EntregavelTipoOrdemServico PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entregavelTipoOrdemServico: EntregavelTipoOrdemServico,
  ): Promise<void> {
    await this.entregavelTipoOrdemServicoRepository.replaceById(
      id,
      entregavelTipoOrdemServico,
    );
  }

  @del('/entregavel-tipo-ordem-servico-contrato/{id}', {
    responses: {
      '204': {
        description: 'EntregavelTipoOrdemServico DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entregavelTipoOrdemServicoRepository.deleteById(id);
  }
}
