import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
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
import {EtapaOrdemServico} from '../models';
import {EtapaOrdemServicoRepository} from '../repositories';

export class EtapaOrdemServicoController {
    constructor(
        @repository(EtapaOrdemServicoRepository)
        public etapaOrdemServicoRepository: EtapaOrdemServicoRepository,
    ) {}

    @post('/etapa-ordem-servico', {
        responses: {
            '200': {
                description: 'EtapaOrdemServico model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(EtapaOrdemServico)},
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EtapaOrdemServico, {
                        title: 'NewEtapaOrdemServico',
                        exclude: ['id'],
                    }),
                },
            },
        })
        etapaOrdemServico: Omit<EtapaOrdemServico, 'id'>,
    ): Promise<EtapaOrdemServico> {
        return this.etapaOrdemServicoRepository.create(etapaOrdemServico);
    }

    @get('/etapa-ordem-servico/count', {
        responses: {
            '200': {
                description: 'EtapaOrdemServico model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(EtapaOrdemServico) where?: Where<EtapaOrdemServico>): Promise<Count> {
        return this.etapaOrdemServicoRepository.count(where);
    }

    @get('/etapa-ordem-servico', {
        responses: {
            '200': {
                description: 'Array of EtapaOrdemServico model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(EtapaOrdemServico, {
                                includeRelations: true,
                            }),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(EtapaOrdemServico) filter?: Filter<EtapaOrdemServico>): Promise<EtapaOrdemServico[]> {
        return this.etapaOrdemServicoRepository.find(filter);
    }

    @patch('/etapa-ordem-servico', {
        responses: {
            '200': {
                description: 'EtapaOrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EtapaOrdemServico, {partial: true}),
                },
            },
        })
        etapaOrdemServico: EtapaOrdemServico,
        @param.where(EtapaOrdemServico) where?: Where<EtapaOrdemServico>,
    ): Promise<Count> {
        return this.etapaOrdemServicoRepository.updateAll(etapaOrdemServico, where);
    }

    @get('/etapa-ordem-servico/{id}', {
        responses: {
            '200': {
                description: 'EtapaOrdemServico model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(EtapaOrdemServico, {
                            includeRelations: true,
                        }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(EtapaOrdemServico, {exclude: 'where'})
        filter?: FilterExcludingWhere<EtapaOrdemServico>,
    ): Promise<EtapaOrdemServico> {
        return this.etapaOrdemServicoRepository.findById(id, filter);
    }

    @patch('/etapa-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'EtapaOrdemServico PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(EtapaOrdemServico, {partial: true}),
                },
            },
        })
        etapaOrdemServico: EtapaOrdemServico,
    ): Promise<void> {
        await this.etapaOrdemServicoRepository.updateById(id, etapaOrdemServico);
    }

    @put('/etapa-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'EtapaOrdemServico PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() etapaOrdemServico: EtapaOrdemServico,
    ): Promise<void> {
        await this.etapaOrdemServicoRepository.replaceById(id, etapaOrdemServico);
    }

    @del('/etapa-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'EtapaOrdemServico DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.etapaOrdemServicoRepository.deleteById(id);
    }
}
