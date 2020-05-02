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
import {MetricaContrato} from '../models';
import {MetricaContratoRepository} from '../repositories';

export class MetricaContratoController {
    constructor(
        @repository(MetricaContratoRepository)
        public metricaContratoRepository: MetricaContratoRepository,
    ) {}

    @post('/metrica-contrato', {
        responses: {
            '200': {
                description: 'MetricaContrato model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(MetricaContrato)},
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MetricaContrato, {
                        title: 'NewMetricaContrato',
                        exclude: ['id'],
                    }),
                },
            },
        })
        metricaContrato: Omit<MetricaContrato, 'id'>,
    ): Promise<MetricaContrato> {
        return this.metricaContratoRepository.create(metricaContrato);
    }

    @get('/metrica-contrato/count', {
        responses: {
            '200': {
                description: 'MetricaContrato model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(MetricaContrato) where?: Where<MetricaContrato>): Promise<Count> {
        return this.metricaContratoRepository.count(where);
    }

    @get('/metrica-contrato', {
        responses: {
            '200': {
                description: 'Array of MetricaContrato model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(MetricaContrato, {
                                includeRelations: true,
                            }),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(MetricaContrato) filter?: Filter<MetricaContrato>): Promise<MetricaContrato[]> {
        return this.metricaContratoRepository.find(filter);
    }

    @patch('/metrica-contrato', {
        responses: {
            '200': {
                description: 'MetricaContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MetricaContrato, {partial: true}),
                },
            },
        })
        metricaContrato: MetricaContrato,
        @param.where(MetricaContrato) where?: Where<MetricaContrato>,
    ): Promise<Count> {
        return this.metricaContratoRepository.updateAll(metricaContrato, where);
    }

    @get('/metrica-contrato/{id}', {
        responses: {
            '200': {
                description: 'MetricaContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(MetricaContrato, {
                            includeRelations: true,
                        }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(MetricaContrato, {exclude: 'where'})
        filter?: FilterExcludingWhere<MetricaContrato>,
    ): Promise<MetricaContrato> {
        return this.metricaContratoRepository.findById(id, filter);
    }

    @patch('/metrica-contrato/{id}', {
        responses: {
            '204': {
                description: 'MetricaContrato PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MetricaContrato, {partial: true}),
                },
            },
        })
        metricaContrato: MetricaContrato,
    ): Promise<void> {
        await this.metricaContratoRepository.updateById(id, metricaContrato);
    }

    @put('/metrica-contrato/{id}', {
        responses: {
            '204': {
                description: 'MetricaContrato PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() metricaContrato: MetricaContrato,
    ): Promise<void> {
        await this.metricaContratoRepository.replaceById(id, metricaContrato);
    }

    @del('/metrica-contrato/{id}', {
        responses: {
            '204': {
                description: 'MetricaContrato DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.metricaContratoRepository.deleteById(id);
    }
}
