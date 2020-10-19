import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {ItemOrdemServico, OrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

@authenticate('jwt')
export class OrdemServicoItemOrdemServicoController {
    constructor(
        @repository(OrdemServicoRepository)
        protected ordemServicoRepository: OrdemServicoRepository,
    ) {}

    @get('/ordem-servicos/{id}/item-ordem-servicos', {
        responses: {
            '200': {
                description: 'Array of OrdemServico has many ItemOrdemServico',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(ItemOrdemServico)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<ItemOrdemServico>,
    ): Promise<ItemOrdemServico[]> {
        return this.ordemServicoRepository.itens(id).find(filter);
    }

    @post('/ordem-servicos/{id}/item-ordem-servicos', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(ItemOrdemServico)},
                },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof OrdemServico.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(ItemOrdemServico, {
                        title: 'NewItemOrdemServicoInOrdemServico',
                        exclude: ['id'],
                        optional: ['idOrdemServico'],
                    }),
                },
            },
        })
        itemOrdemServico: Omit<ItemOrdemServico, 'id'>,
    ): Promise<ItemOrdemServico> {
        return this.ordemServicoRepository.itens(id).create(itemOrdemServico);
    }

    @patch('/ordem-servicos/{id}/item-ordem-servicos', {
        responses: {
            '200': {
                description: 'OrdemServico.ItemOrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(ItemOrdemServico, {partial: true}),
                },
            },
        })
        itemOrdemServico: Partial<ItemOrdemServico>,
        @param.query.object('where', getWhereSchemaFor(ItemOrdemServico))
        where?: Where<ItemOrdemServico>,
    ): Promise<Count> {
        return this.ordemServicoRepository.itens(id).patch(itemOrdemServico, where);
    }

    @del('/ordem-servicos/{id}/item-ordem-servicos', {
        responses: {
            '200': {
                description: 'OrdemServico.ItemOrdemServico DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(ItemOrdemServico))
        where?: Where<ItemOrdemServico>,
    ): Promise<Count> {
        return this.ordemServicoRepository.itens(id).delete(where);
    }
}
