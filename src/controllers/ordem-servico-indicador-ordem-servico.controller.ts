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
import {OrdemServico, IndicadorOrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

export class OrdemServicoIndicadorOrdemServicoController {
  constructor(
    @repository(OrdemServicoRepository)
    protected ordemServicoRepository: OrdemServicoRepository,
  ) {}

  @get('/ordem-servicos/{id}/indicador-ordem-servicos', {
    responses: {
      '200': {
        description: 'Array of OrdemServico has many IndicadorOrdemServico',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(IndicadorOrdemServico),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<IndicadorOrdemServico>,
  ): Promise<IndicadorOrdemServico[]> {
    return this.ordemServicoRepository.indicadores(id).find(filter);
  }

  @post('/ordem-servicos/{id}/indicador-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(IndicadorOrdemServico),
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
          schema: getModelSchemaRef(IndicadorOrdemServico, {
            title: 'NewIndicadorOrdemServicoInOrdemServico',
            exclude: ['id'],
            optional: ['idOrdemServico'],
          }),
        },
      },
    })
    indicadorOrdemServico: Omit<IndicadorOrdemServico, 'id'>,
  ): Promise<IndicadorOrdemServico> {
    return this.ordemServicoRepository
      .indicadores(id)
      .create(indicadorOrdemServico);
  }

  @patch('/ordem-servicos/{id}/indicador-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.IndicadorOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(IndicadorOrdemServico, {partial: true}),
        },
      },
    })
    indicadorOrdemServico: Partial<IndicadorOrdemServico>,
    @param.query.object('where', getWhereSchemaFor(IndicadorOrdemServico))
    where?: Where<IndicadorOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository
      .indicadores(id)
      .patch(indicadorOrdemServico, where);
  }

  @del('/ordem-servicos/{id}/indicador-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.IndicadorOrdemServico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(IndicadorOrdemServico))
    where?: Where<IndicadorOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository.indicadores(id).delete(where);
  }
}
