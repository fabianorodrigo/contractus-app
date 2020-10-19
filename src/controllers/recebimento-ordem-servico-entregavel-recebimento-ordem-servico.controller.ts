import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {EntregavelRecebimentoOrdemServico, RecebimentoOrdemServico} from '../models';
import {RecebimentoOrdemServicoRepository} from '../repositories';

@authenticate('jwt')
export class RecebimentoOrdemServicoEntregavelRecebimentoOrdemServicoController {
    constructor(
        @repository(RecebimentoOrdemServicoRepository)
        protected recebimentoOrdemServicoRepository: RecebimentoOrdemServicoRepository,
    ) {}

    @get('/recebimento-ordem-servicos/{id}/entregavel-recebimento-ordem-servicos', {
        responses: {
            '200': {
                description: 'Array of RecebimentoOrdemServico has many EntregavelRecebimentoOrdemServico',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(EntregavelRecebimentoOrdemServico)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<EntregavelRecebimentoOrdemServico>,
    ): Promise<EntregavelRecebimentoOrdemServico[]> {
        return this.recebimentoOrdemServicoRepository.entregaveis(id).find(filter);
    }

    @post('/recebimento-ordem-servicos/{id}/entregavel-recebimento-ordem-servicos', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico model instance',
                content: {'application/json': {schema: getModelSchemaRef(EntregavelRecebimentoOrdemServico)}},
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof RecebimentoOrdemServico.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EntregavelRecebimentoOrdemServico, {
                        title: 'NewEntregavelRecebimentoOrdemServicoInRecebimentoOrdemServico',
                        exclude: ['id'],
                        optional: ['idRecebimentoOrdemServico'],
                    }),
                },
            },
        })
        entregavelRecebimentoOrdemServico: Omit<EntregavelRecebimentoOrdemServico, 'id'>,
    ): Promise<EntregavelRecebimentoOrdemServico> {
        return this.recebimentoOrdemServicoRepository.entregaveis(id).create(entregavelRecebimentoOrdemServico);
    }

    @patch('/recebimento-ordem-servicos/{id}/entregavel-recebimento-ordem-servicos', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico.EntregavelRecebimentoOrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EntregavelRecebimentoOrdemServico, {partial: true}),
                },
            },
        })
        entregavelRecebimentoOrdemServico: Partial<EntregavelRecebimentoOrdemServico>,
        @param.query.object('where', getWhereSchemaFor(EntregavelRecebimentoOrdemServico))
        where?: Where<EntregavelRecebimentoOrdemServico>,
    ): Promise<Count> {
        return this.recebimentoOrdemServicoRepository.entregaveis(id).patch(entregavelRecebimentoOrdemServico, where);
    }

    @del('/recebimento-ordem-servicos/{id}/entregavel-recebimento-ordem-servicos', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico.EntregavelRecebimentoOrdemServico DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(EntregavelRecebimentoOrdemServico))
        where?: Where<EntregavelRecebimentoOrdemServico>,
    ): Promise<Count> {
        return this.recebimentoOrdemServicoRepository.entregaveis(id).delete(where);
    }
}
