import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {IndicadorNiveisServicoContrato, SancaoIndicadorNiveisServicoContrato} from '../models';
import {IndicadorNiveisServicoContratoRepository} from '../repositories';

export class IndicadorNiveisServicoContratoSancaoIndicadorNiveisServicoContratoController {
    constructor(
        @repository(IndicadorNiveisServicoContratoRepository)
        protected indicadorNiveisServicoContratoRepository: IndicadorNiveisServicoContratoRepository,
    ) {}

    @get('/indicador-niveis-servico-contratoes/{id}/sancao-indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'Array of IndicadorNiveisServicoContrato has many SancaoIndicadorNiveisServicoContrato',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter')
        filter?: Filter<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<SancaoIndicadorNiveisServicoContrato[]> {
        return this.indicadorNiveisServicoContratoRepository.sancoes(id).find(filter);
    }

    @post('/indicador-niveis-servico-contratoes/{id}/sancao-indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'IndicadorNiveisServicoContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato),
                    },
                },
            },
        },
    })
    async create(
        @param.path.number('id')
        id: typeof IndicadorNiveisServicoContrato.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                        title: 'NewSancaoIndicadorNiveisServicoContratoInIndicadorNiveisServicoContrato',
                        exclude: ['id'],
                    }),
                },
            },
        })
        sancaoIndicadorNiveisServicoContrato: Omit<SancaoIndicadorNiveisServicoContrato, 'id'>,
    ): Promise<SancaoIndicadorNiveisServicoContrato> {
        return this.indicadorNiveisServicoContratoRepository.sancoes(id).create(sancaoIndicadorNiveisServicoContrato);
    }

    @patch('/indicador-niveis-servico-contratoes/{id}/sancao-indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'IndicadorNiveisServicoContrato.SancaoIndicadorNiveisServicoContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                        partial: true,
                    }),
                },
            },
        })
        sancaoIndicadorNiveisServicoContrato: Partial<SancaoIndicadorNiveisServicoContrato>,
        @param.query.object('where', getWhereSchemaFor(SancaoIndicadorNiveisServicoContrato))
        where?: Where<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.indicadorNiveisServicoContratoRepository
            .sancoes(id)
            .patch(sancaoIndicadorNiveisServicoContrato, where);
    }

    @del('/indicador-niveis-servico-contratoes/{id}/sancao-indicador-niveis-servico-contratoes', {
        responses: {
            '200': {
                description: 'IndicadorNiveisServicoContrato.SancaoIndicadorNiveisServicoContrato DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(SancaoIndicadorNiveisServicoContrato))
        where?: Where<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.indicadorNiveisServicoContratoRepository.sancoes(id).delete(where);
    }
}
