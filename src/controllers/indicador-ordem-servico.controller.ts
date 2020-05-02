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
import {IndicadorOrdemServico} from '../models';
import {IndicadorOrdemServicoRepository} from '../repositories';

export class IndicadorOrdemServicoController {
    constructor(
        @repository(IndicadorOrdemServicoRepository)
        public indicadorOrdemServicoRepository: IndicadorOrdemServicoRepository,
    ) {}

    @post('/indicador-ordem-servico', {
        responses: {
            '200': {
                description: 'IndicadorOrdemServico model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(IndicadorOrdemServico),
                    },
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(IndicadorOrdemServico, {
                        title: 'NewIndicadorOrdemServico',
                        exclude: ['id'],
                    }),
                },
            },
        })
        indicadorOrdemServico: Omit<IndicadorOrdemServico, 'id'>,
    ): Promise<IndicadorOrdemServico> {
        return this.indicadorOrdemServicoRepository.create(indicadorOrdemServico);
    }

    @get('/indicador-ordem-servico/count', {
        responses: {
            '200': {
                description: 'IndicadorOrdemServico model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(IndicadorOrdemServico) where?: Where<IndicadorOrdemServico>): Promise<Count> {
        return this.indicadorOrdemServicoRepository.count(where);
    }

    @get('/indicador-ordem-servico', {
        responses: {
            '200': {
                description: 'Array of IndicadorOrdemServico model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(IndicadorOrdemServico, {
                                includeRelations: true,
                            }),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(IndicadorOrdemServico) filter?: Filter<IndicadorOrdemServico>,
    ): Promise<IndicadorOrdemServico[]> {
        return this.indicadorOrdemServicoRepository.find(filter);
    }

    @patch('/indicador-ordem-servico', {
        responses: {
            '200': {
                description: 'IndicadorOrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(IndicadorOrdemServico, {partial: true}),
                },
            },
        })
        indicadorOrdemServico: IndicadorOrdemServico,
        @param.where(IndicadorOrdemServico) where?: Where<IndicadorOrdemServico>,
    ): Promise<Count> {
        return this.indicadorOrdemServicoRepository.updateAll(indicadorOrdemServico, where);
    }

    @get('/indicador-ordem-servico/{id}', {
        responses: {
            '200': {
                description: 'IndicadorOrdemServico model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(IndicadorOrdemServico, {
                            includeRelations: true,
                        }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(IndicadorOrdemServico, {exclude: 'where'})
        filter?: FilterExcludingWhere<IndicadorOrdemServico>,
    ): Promise<IndicadorOrdemServico> {
        return this.indicadorOrdemServicoRepository.findById(id, filter);
    }

    @patch('/indicador-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'IndicadorOrdemServico PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(IndicadorOrdemServico, {partial: true}),
                },
            },
        })
        indicadorOrdemServico: IndicadorOrdemServico,
    ): Promise<void> {
        await this.indicadorOrdemServicoRepository.updateById(id, indicadorOrdemServico);
    }

    @put('/indicador-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'IndicadorOrdemServico PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() indicadorOrdemServico: IndicadorOrdemServico,
    ): Promise<void> {
        await this.indicadorOrdemServicoRepository.replaceById(id, indicadorOrdemServico);
    }

    @del('/indicador-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'IndicadorOrdemServico DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.indicadorOrdemServicoRepository.deleteById(id);
    }
}
