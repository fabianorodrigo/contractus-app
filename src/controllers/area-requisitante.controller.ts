import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {AreaRequisitante} from '../models';
import {AreaRequisitanteRepository} from '../repositories';

@authenticate('jwt')
export class AreaRequisitanteController {
    constructor(
        @repository(AreaRequisitanteRepository)
        public areaRequisitanteRepository: AreaRequisitanteRepository,
        /**
         * If only some of the controller methods are decorated with the @authenticate decorator,
         * then the injection decorator for SecurityBindings.USER in the controller’s constructor
         * must be specified as @inject(SecurityBindings.USER, {optional:true}) to avoid a binding
         * error when an unauthenticated endpoint is accessed. Alternatively, do not inject
         * SecurityBindings.USER in the controller constructor, but in the controller methods which
         * are actually decorated with the @authenticate decorator
         */
        @inject(SecurityBindings.USER, {optional: true})
        private userProfile: UserProfile,
    ) {}

    @post('/areaRequisitante', {
        responses: {
            '200': {
                description: 'AreaRequisitante model instance',
                content: {'application/json': {schema: getModelSchemaRef(AreaRequisitante)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(AreaRequisitante, {
                        title: 'NewAreaRequisitante',
                        exclude: ['id'],
                    }),
                },
            },
        })
        areaRequisitante: Omit<AreaRequisitante, 'id'>,
    ): Promise<AreaRequisitante> {
        return this.areaRequisitanteRepository.create(areaRequisitante);
    }

    @authenticate('jwt')
    @get('/areaRequisitante/count', {
        responses: {
            '200': {
                description: 'AreaRequisitante model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(AreaRequisitante) where?: Where<AreaRequisitante>): Promise<Count> {
        return this.areaRequisitanteRepository.count(where);
    }

    @get('/areaRequisitante', {
        responses: {
            '200': {
                description: 'Array of AreaRequisitante model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(AreaRequisitante, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(AreaRequisitante) filter?: Filter<AreaRequisitante>): Promise<AreaRequisitante[]> {
        return this.areaRequisitanteRepository.find(filter);
    }

    @patch('/areaRequisitante', {
        responses: {
            '200': {
                description: 'AreaRequisitante PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(AreaRequisitante, {partial: true}),
                },
            },
        })
        areaRequisitante: AreaRequisitante,
        @param.where(AreaRequisitante) where?: Where<AreaRequisitante>,
    ): Promise<Count> {
        return this.areaRequisitanteRepository.updateAll(areaRequisitante, where);
    }

    @get('/areaRequisitante/{id}', {
        responses: {
            '200': {
                description: 'AreaRequisitante model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(AreaRequisitante, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(AreaRequisitante, {exclude: 'where'}) filter?: FilterExcludingWhere<AreaRequisitante>,
    ): Promise<AreaRequisitante> {
        return this.areaRequisitanteRepository.findById(id, filter);
    }

    @patch('/areaRequisitante/{id}', {
        responses: {
            '204': {
                description: 'AreaRequisitante PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(AreaRequisitante, {partial: true}),
                },
            },
        })
        areaRequisitante: AreaRequisitante,
    ): Promise<void> {
        await this.areaRequisitanteRepository.updateById(id, areaRequisitante);
    }

    @put('/areaRequisitante/{id}', {
        responses: {
            '204': {
                description: 'AreaRequisitante PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() areaRequisitante: AreaRequisitante,
    ): Promise<void> {
        await this.areaRequisitanteRepository.replaceById(id, areaRequisitante);
    }

    @del('/areaRequisitante/{id}', {
        responses: {
            '204': {
                description: 'AreaRequisitante DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.areaRequisitanteRepository.deleteById(id);
    }
}
