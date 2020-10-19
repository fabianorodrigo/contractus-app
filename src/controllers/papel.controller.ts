import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Papel} from '../models';
import {PapelRepository} from '../repositories';

@authenticate('jwt')
export class PapelController {
    constructor(
        @repository(PapelRepository)
        public papelRepository: PapelRepository,
    ) {}

    @post('/papel', {
        responses: {
            '200': {
                description: 'Papel model instance',
                content: {'application/json': {schema: getModelSchemaRef(Papel)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Papel, {
                        title: 'NewPapel',
                        exclude: ['id'],
                    }),
                },
            },
        })
        papel: Omit<Papel, 'id'>,
    ): Promise<Papel> {
        return this.papelRepository.create(papel);
    }

    @get('/papel/count', {
        responses: {
            '200': {
                description: 'Papel model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(Papel) where?: Where<Papel>): Promise<Count> {
        return this.papelRepository.count(where);
    }

    @get('/papel', {
        responses: {
            '200': {
                description: 'Array of Papel model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Papel, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(Papel) filter?: Filter<Papel>): Promise<Papel[]> {
        return this.papelRepository.find(filter);
    }

    @patch('/papel', {
        responses: {
            '200': {
                description: 'Papel PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Papel, {partial: true}),
                },
            },
        })
        papel: Papel,
        @param.where(Papel) where?: Where<Papel>,
    ): Promise<Count> {
        return this.papelRepository.updateAll(papel, where);
    }

    @get('/papel/{id}', {
        responses: {
            '200': {
                description: 'Papel model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Papel, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Papel, {exclude: 'where'})
        filter?: FilterExcludingWhere<Papel>,
    ): Promise<Papel> {
        return this.papelRepository.findById(id, filter);
    }

    @patch('/papel/{id}', {
        responses: {
            '204': {
                description: 'Papel PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Papel, {partial: true}),
                },
            },
        })
        papel: Papel,
    ): Promise<void> {
        await this.papelRepository.updateById(id, papel);
    }

    @put('/papel/{id}', {
        responses: {
            '204': {
                description: 'Papel PUT success',
            },
        },
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() papel: Papel): Promise<void> {
        await this.papelRepository.replaceById(id, papel);
    }

    @del('/papel/{id}', {
        responses: {
            '204': {
                description: 'Papel DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.papelRepository.deleteById(id);
    }
}
