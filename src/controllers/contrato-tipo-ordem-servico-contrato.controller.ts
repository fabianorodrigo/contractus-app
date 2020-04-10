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
import {Contrato, TipoOrdemServicoContrato} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoTipoOrdemServicoContratoController {
  constructor(
    @repository(ContratoRepository)
    protected contratoRepository: ContratoRepository,
  ) {}

  @get('/contratoes/{id}/tipo-ordem-servico-contratoes', {
    responses: {
      '200': {
        description: 'Array of Contrato has many TipoOrdemServicoContrato',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TipoOrdemServicoContrato),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TipoOrdemServicoContrato>,
  ): Promise<TipoOrdemServicoContrato[]> {
    return this.contratoRepository.tiposOrdemServico(id).find(filter);
  }

  @post('/contratoes/{id}/tipo-ordem-servico-contratoes', {
    responses: {
      '200': {
        description: 'Contrato model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoOrdemServicoContrato),
          },
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Contrato.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOrdemServicoContrato, {
            title: 'NewTipoOrdemServicoContratoInContrato',
            exclude: ['id'],
            optional: ['idContrato'],
          }),
        },
      },
    })
    tipoOrdemServicoContrato: Omit<TipoOrdemServicoContrato, 'id'>,
  ): Promise<TipoOrdemServicoContrato> {
    return this.contratoRepository
      .tiposOrdemServico(id)
      .create(tipoOrdemServicoContrato);
  }

  @patch('/contratoes/{id}/tipo-ordem-servico-contratoes', {
    responses: {
      '200': {
        description: 'Contrato.TipoOrdemServicoContrato PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOrdemServicoContrato, {partial: true}),
        },
      },
    })
    tipoOrdemServicoContrato: Partial<TipoOrdemServicoContrato>,
    @param.query.object('where', getWhereSchemaFor(TipoOrdemServicoContrato))
    where?: Where<TipoOrdemServicoContrato>,
  ): Promise<Count> {
    return this.contratoRepository
      .tiposOrdemServico(id)
      .patch(tipoOrdemServicoContrato, where);
  }

  @del('/contratoes/{id}/tipo-ordem-servico-contratoes', {
    responses: {
      '200': {
        description: 'Contrato.TipoOrdemServicoContrato DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TipoOrdemServicoContrato))
    where?: Where<TipoOrdemServicoContrato>,
  ): Promise<Count> {
    return this.contratoRepository.tiposOrdemServico(id).delete(where);
  }
}
