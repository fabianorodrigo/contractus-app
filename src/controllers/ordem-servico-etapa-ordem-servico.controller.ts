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
import {OrdemServico, EtapaOrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

export class OrdemServicoEtapaOrdemServicoController {
  constructor(
    @repository(OrdemServicoRepository)
    protected ordemServicoRepository: OrdemServicoRepository,
  ) {}

  @get('/ordem-servicos/{id}/etapa-ordem-servicos', {
    responses: {
      '200': {
        description: 'Array of OrdemServico has many EtapaOrdemServico',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EtapaOrdemServico),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EtapaOrdemServico>,
  ): Promise<EtapaOrdemServico[]> {
    return this.ordemServicoRepository.etapas(id).find(filter);
  }

  @post('/ordem-servicos/{id}/etapa-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(EtapaOrdemServico)},
        },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof OrdemServico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EtapaOrdemServico, {
            title: 'NewEtapaOrdemServicoInOrdemServico',
            exclude: ['id'],
            optional: ['idOrdemServico'],
          }),
        },
      },
    })
    etapaOrdemServico: Omit<EtapaOrdemServico, 'id'>,
  ): Promise<EtapaOrdemServico> {
    return this.ordemServicoRepository.etapas(id).create(etapaOrdemServico);
  }

  @patch('/ordem-servicos/{id}/etapa-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.EtapaOrdemServico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EtapaOrdemServico, {partial: true}),
        },
      },
    })
    etapaOrdemServico: Partial<EtapaOrdemServico>,
    @param.query.object('where', getWhereSchemaFor(EtapaOrdemServico))
    where?: Where<EtapaOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository
      .etapas(id)
      .patch(etapaOrdemServico, where);
  }

  @del('/ordem-servicos/{id}/etapa-ordem-servicos', {
    responses: {
      '200': {
        description: 'OrdemServico.EtapaOrdemServico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EtapaOrdemServico))
    where?: Where<EtapaOrdemServico>,
  ): Promise<Count> {
    return this.ordemServicoRepository.etapas(id).delete(where);
  }
}
