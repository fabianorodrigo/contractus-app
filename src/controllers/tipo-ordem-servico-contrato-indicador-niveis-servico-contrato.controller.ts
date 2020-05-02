import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {TipoOrdemServicoContrato, IndicadorNiveisServicoContrato} from '../models';
import {TipoOrdemServicoContratoRepository} from '../repositories';

export class TipoOrdemServicoContratoIndicadorNiveisServicoContratoController {
    constructor(
        @repository(TipoOrdemServicoContratoRepository)
        protected tipoOrdemServicoContratoRepository: TipoOrdemServicoContratoRepository,
    ) {}

    @get('/tipo-ordem-servico-contratoes/{id}/indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'Array of TipoOrdemServicoContrato has many IndicadorNiveisServicoContrato',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(IndicadorNiveisServicoContrato),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter')
        filter?: Filter<IndicadorNiveisServicoContrato>,
    ): Promise<IndicadorNiveisServicoContrato[]> {
        return this.tipoOrdemServicoContratoRepository.indicadores(id).find(filter);
    }

    @post('/tipo-ordem-servico-contratoes/{id}/indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'TipoOrdemServicoContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(IndicadorNiveisServicoContrato),
                    },
                },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof TipoOrdemServicoContrato.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
                        title: 'NewIndicadorNiveisServicoContratoInTipoOrdemServicoContrato',
                        exclude: ['id'],
                        optional: ['idTipoOrdemServicoContrato'],
                    }),
                },
            },
        })
        indicadorNiveisServicoContrato: Omit<IndicadorNiveisServicoContrato, 'id'>,
    ): Promise<IndicadorNiveisServicoContrato> {
        return this.tipoOrdemServicoContratoRepository.indicadores(id).create(indicadorNiveisServicoContrato);
    }

    @patch('/tipo-ordem-servico-contratoes/{id}/indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'TipoOrdemServicoContrato.IndicadorNiveisServicoContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(IndicadorNiveisServicoContrato, {
                        partial: true,
                    }),
                },
            },
        })
        indicadorNiveisServicoContrato: Partial<IndicadorNiveisServicoContrato>,
        @param.query.object('where', getWhereSchemaFor(IndicadorNiveisServicoContrato))
        where?: Where<IndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.tipoOrdemServicoContratoRepository.indicadores(id).patch(indicadorNiveisServicoContrato, where);
    }

    @del('/tipo-ordem-servico-contratoes/{id}/indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'TipoOrdemServicoContrato.IndicadorNiveisServicoContrato DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(IndicadorNiveisServicoContrato))
        where?: Where<IndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.tipoOrdemServicoContratoRepository.indicadores(id).delete(where);
    }
}
