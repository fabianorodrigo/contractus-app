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
import {SancaoIndicadorNiveisServicoContrato} from '../models';
import {SancaoIndicadorNiveisServicoContratoRepository} from '../repositories';

export class SancaoIndicadorNiveisServicoContratoController {
    constructor(
        @repository(SancaoIndicadorNiveisServicoContratoRepository)
        public sancaoIndicadorNiveisServicoContratoRepository: SancaoIndicadorNiveisServicoContratoRepository,
    ) {}

    @post('/sancao-indicador-niveis-servico-contrato', {
        responses: {
            '200': {
                description: 'SancaoIndicadorNiveisServicoContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato),
                    },
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                        title: 'NewSancaoIndicadorNiveisServicoContrato',
                        exclude: ['id'],
                    }),
                },
            },
        })
        sancaoIndicadorNiveisServicoContrato: Omit<SancaoIndicadorNiveisServicoContrato, 'id'>,
    ): Promise<SancaoIndicadorNiveisServicoContrato> {
        return this.sancaoIndicadorNiveisServicoContratoRepository.create(sancaoIndicadorNiveisServicoContrato);
    }

    @get('/sancao-indicador-niveis-servico-contrato/count', {
        responses: {
            '200': {
                description: 'SancaoIndicadorNiveisServicoContrato model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.where(SancaoIndicadorNiveisServicoContrato)
        where?: Where<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.sancaoIndicadorNiveisServicoContratoRepository.count(where);
    }

    @get('/sancao-indicador-niveis-servico-contrato', {
        responses: {
            '200': {
                description: 'Array of SancaoIndicadorNiveisServicoContrato model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                                includeRelations: true,
                            }),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(SancaoIndicadorNiveisServicoContrato)
        filter?: Filter<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<SancaoIndicadorNiveisServicoContrato[]> {
        return this.sancaoIndicadorNiveisServicoContratoRepository.find(filter);
    }

    @patch('/sancao-indicador-niveis-servico-contrato', {
        responses: {
            '200': {
                description: 'SancaoIndicadorNiveisServicoContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                        partial: true,
                    }),
                },
            },
        })
        sancaoIndicadorNiveisServicoContrato: SancaoIndicadorNiveisServicoContrato,
        @param.where(SancaoIndicadorNiveisServicoContrato)
        where?: Where<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<Count> {
        return this.sancaoIndicadorNiveisServicoContratoRepository.updateAll(
            sancaoIndicadorNiveisServicoContrato,
            where,
        );
    }

    @get('/sancao-indicador-niveis-servico-contrato/{id}', {
        responses: {
            '200': {
                description: 'SancaoIndicadorNiveisServicoContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(SancaoIndicadorNiveisServicoContrato, {
                            includeRelations: true,
                        }),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(SancaoIndicadorNiveisServicoContrato, {exclude: 'where'})
        filter?: FilterExcludingWhere<SancaoIndicadorNiveisServicoContrato>,
    ): Promise<SancaoIndicadorNiveisServicoContrato> {
        return this.sancaoIndicadorNiveisServicoContratoRepository.findById(id, filter);
    }

    @patch('/sancao-indicador-niveis-servico-contrato/{id}', {
        responses: {
            '204': {
                description: 'SancaoIndicadorNiveisServicoContrato PATCH success',
            },
        },
    })
    async updateById(
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
        sancaoIndicadorNiveisServicoContrato: SancaoIndicadorNiveisServicoContrato,
    ): Promise<void> {
        await this.sancaoIndicadorNiveisServicoContratoRepository.updateById(id, sancaoIndicadorNiveisServicoContrato);
    }

    @put('/sancao-indicador-niveis-servico-contrato/{id}', {
        responses: {
            '204': {
                description: 'SancaoIndicadorNiveisServicoContrato PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody()
        sancaoIndicadorNiveisServicoContrato: SancaoIndicadorNiveisServicoContrato,
    ): Promise<void> {
        await this.sancaoIndicadorNiveisServicoContratoRepository.replaceById(id, sancaoIndicadorNiveisServicoContrato);
    }

    @del('/sancao-indicador-niveis-servico-contrato/{id}', {
        responses: {
            '204': {
                description: 'SancaoIndicadorNiveisServicoContrato DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.sancaoIndicadorNiveisServicoContratoRepository.deleteById(id);
    }
}
