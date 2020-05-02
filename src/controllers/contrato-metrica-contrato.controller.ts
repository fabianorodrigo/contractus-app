import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Contrato, MetricaContrato} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoMetricaContratoController {
    constructor(
        @repository(ContratoRepository)
        protected contratoRepository: ContratoRepository,
    ) {}

    @get('/contratoes/{id}/metrica-contratoes', {
        responses: {
            '200': {
                description: 'Array of Contrato has many MetricaContrato',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(MetricaContrato)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<MetricaContrato>,
    ): Promise<MetricaContrato[]> {
        return this.contratoRepository.metricas(id).find(filter);
    }

    @post('/contratoes/{id}/metrica-contratoes', {
        responses: {
            '200': {
                description: 'Contrato model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(MetricaContrato)},
                },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Contrato.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MetricaContrato, {
                        title: 'NewMetricaContratoInContrato',
                        exclude: ['id'],
                        optional: ['idContrato'],
                    }),
                },
            },
        })
        metricaContrato: Omit<MetricaContrato, 'id'>,
    ): Promise<MetricaContrato> {
        return this.contratoRepository.metricas(id).create(metricaContrato);
    }

    @patch('/contratoes/{id}/metrica-contratoes', {
        responses: {
            '200': {
                description: 'Contrato.MetricaContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(MetricaContrato, {partial: true}),
                },
            },
        })
        metricaContrato: Partial<MetricaContrato>,
        @param.query.object('where', getWhereSchemaFor(MetricaContrato))
        where?: Where<MetricaContrato>,
    ): Promise<Count> {
        return this.contratoRepository.metricas(id).patch(metricaContrato, where);
    }

    @del('/contratoes/{id}/metrica-contratoes', {
        responses: {
            '200': {
                description: 'Contrato.MetricaContrato DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(MetricaContrato))
        where?: Where<MetricaContrato>,
    ): Promise<Count> {
        return this.contratoRepository.metricas(id).delete(where);
    }
}
