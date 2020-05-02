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
import {PapelContrato} from '../models';
import {PapelContratoRepository} from '../repositories';

export class PapelContratoController {
    constructor(
        @repository(PapelContratoRepository)
        public papelContratoRepository: PapelContratoRepository,
    ) {}

    @post('/papel-contrato', {
        responses: {
            '200': {
                description: 'PapelContrato model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(PapelContrato)},
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(PapelContrato, {
                        title: 'NewPapelContrato',
                        exclude: ['id'],
                    }),
                },
            },
        })
        papelContrato: Omit<PapelContrato, 'id'>,
    ): Promise<PapelContrato> {
        return this.papelContratoRepository.create(papelContrato);
    }

    @get('/papel-contrato/count', {
        responses: {
            '200': {
                description: 'PapelContrato model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(PapelContrato) where?: Where<PapelContrato>): Promise<Count> {
        return this.papelContratoRepository.count(where);
    }

    @get('/papel-contrato', {
        responses: {
            '200': {
                description: 'Array of PapelContrato model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(PapelContrato, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(PapelContrato) filter?: Filter<PapelContrato>): Promise<PapelContrato[]> {
        return this.papelContratoRepository.find(filter);
    }

    @patch('/papel-contrato', {
        responses: {
            '200': {
                description: 'PapelContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(PapelContrato, {partial: true}),
                },
            },
        })
        papelContrato: PapelContrato,
        @param.where(PapelContrato) where?: Where<PapelContrato>,
    ): Promise<Count> {
        return this.papelContratoRepository.updateAll(papelContrato, where);
    }

    @get('/papel-contrato/{id}', {
        responses: {
            '200': {
                description: 'PapelContrato model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(PapelContrato, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(PapelContrato, {exclude: 'where'})
        filter?: FilterExcludingWhere<PapelContrato>,
    ): Promise<PapelContrato> {
        return this.papelContratoRepository.findById(id, filter);
    }

    @patch('/papel-contrato/{id}', {
        responses: {
            '204': {
                description: 'PapelContrato PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(PapelContrato, {partial: true}),
                },
            },
        })
        papelContrato: PapelContrato,
    ): Promise<void> {
        await this.papelContratoRepository.updateById(id, papelContrato);
    }

    @put('/papel-contrato/{id}', {
        responses: {
            '204': {
                description: 'PapelContrato PUT success',
            },
        },
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() papelContrato: PapelContrato): Promise<void> {
        await this.papelContratoRepository.replaceById(id, papelContrato);
    }

    @del('/papel-contrato/{id}', {
        responses: {
            '204': {
                description: 'PapelContrato DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.papelContratoRepository.deleteById(id);
    }
}
