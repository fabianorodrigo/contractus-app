import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Fornecedor} from '../models';
import {FornecedorRepository} from '../repositories';

@authenticate('jwt')
export class FornecedorController {
    constructor(
        @repository(FornecedorRepository)
        public fornecedorRepository: FornecedorRepository,
    ) {}

    @post('/fornecedor', {
        responses: {
            '200': {
                description: 'Fornecedor model instance',
                content: {'application/json': {schema: getModelSchemaRef(Fornecedor)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fornecedor, {
                        title: 'NewFornecedor',
                        exclude: ['id'],
                    }),
                },
            },
        })
        fornecedor: Omit<Fornecedor, 'id'>,
    ): Promise<Fornecedor> {
        return this.fornecedorRepository.create(fornecedor);
    }

    @get('/fornecedor/count', {
        responses: {
            '200': {
                description: 'Fornecedor model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(Fornecedor) where?: Where<Fornecedor>): Promise<Count> {
        return this.fornecedorRepository.count(where);
    }

    @get('/fornecedor', {
        responses: {
            '200': {
                description: 'Array of Fornecedor model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Fornecedor, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(Fornecedor) filter?: Filter<Fornecedor>): Promise<Fornecedor[]> {
        return this.fornecedorRepository.find(filter);
    }

    @patch('/fornecedor', {
        responses: {
            '200': {
                description: 'Fornecedor PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fornecedor, {partial: true}),
                },
            },
        })
        fornecedor: Fornecedor,
        @param.where(Fornecedor) where?: Where<Fornecedor>,
    ): Promise<Count> {
        return this.fornecedorRepository.updateAll(fornecedor, where);
    }

    @get('/fornecedor/{id}', {
        responses: {
            '200': {
                description: 'Fornecedor model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Fornecedor, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Fornecedor, {exclude: 'where'})
        filter?: FilterExcludingWhere<Fornecedor>,
    ): Promise<Fornecedor> {
        return this.fornecedorRepository.findById(id, filter);
    }

    @patch('/fornecedor/{id}', {
        responses: {
            '204': {
                description: 'Fornecedor PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Fornecedor, {partial: true}),
                },
            },
        })
        fornecedor: Fornecedor,
    ): Promise<void> {
        await this.fornecedorRepository.updateById(id, fornecedor);
    }

    @put('/fornecedor/{id}', {
        responses: {
            '204': {
                description: 'Fornecedor PUT success',
            },
        },
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() fornecedor: Fornecedor): Promise<void> {
        await this.fornecedorRepository.replaceById(id, fornecedor);
    }

    @del('/fornecedor/{id}', {
        responses: {
            '204': {
                description: 'Fornecedor DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.fornecedorRepository.deleteById(id);
    }
}
