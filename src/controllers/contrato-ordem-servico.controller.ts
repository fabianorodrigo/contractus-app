import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Contrato, OrdemServico} from '../models';
import {ContratoRepository} from '../repositories';

@authenticate('jwt')
export class ContratoOrdemServicoController {
    constructor(
        @repository(ContratoRepository)
        protected contratoRepository: ContratoRepository,
    ) {}

    @get('/contratoes/{id}/ordem-servicos', {
        responses: {
            '200': {
                description: 'Array of Contrato has many OrdemServico',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(OrdemServico)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<OrdemServico>,
    ): Promise<OrdemServico[]> {
        return this.contratoRepository.ordensServico(id).find(filter);
    }

    @post('/contratoes/{id}/ordem-servicos', {
        responses: {
            '200': {
                description: 'Contrato model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(OrdemServico)},
                },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Contrato.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServico, {
                        title: 'NewOrdemServicoInContrato',
                        exclude: ['id'],
                        optional: ['idContrato'],
                    }),
                },
            },
        })
        ordemServico: Omit<OrdemServico, 'id'>,
    ): Promise<OrdemServico> {
        return this.contratoRepository.ordensServico(id).create(ordemServico);
    }

    @patch('/contratoes/{id}/ordem-servicos', {
        responses: {
            '200': {
                description: 'Contrato.OrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServico, {partial: true}),
                },
            },
        })
        ordemServico: Partial<OrdemServico>,
        @param.query.object('where', getWhereSchemaFor(OrdemServico))
        where?: Where<OrdemServico>,
    ): Promise<Count> {
        return this.contratoRepository.ordensServico(id).patch(ordemServico, where);
    }

    @del('/contratoes/{id}/ordem-servicos', {
        responses: {
            '200': {
                description: 'Contrato.OrdemServico DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(OrdemServico))
        where?: Where<OrdemServico>,
    ): Promise<Count> {
        return this.contratoRepository.ordensServico(id).delete(where);
    }
}
