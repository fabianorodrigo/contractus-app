import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Contrato, PapelContrato} from '../models';
import {ContratoRepository} from '../repositories';

export class ContratoPapelContratoController {
    constructor(
        @repository(ContratoRepository)
        protected contratoRepository: ContratoRepository,
    ) {}

    @get('/contratoes/{id}/papel-contratoes', {
        responses: {
            '200': {
                description: 'Array of Contrato has many PapelContrato',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(PapelContrato)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<PapelContrato>,
    ): Promise<PapelContrato[]> {
        return this.contratoRepository.papeis(id).find(filter);
    }

    @post('/contratoes/{id}/papel-contratoes', {
        responses: {
            '200': {
                description: 'Contrato model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(PapelContrato)},
                },
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Contrato.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(PapelContrato, {
                        title: 'NewPapelContratoInContrato',
                        exclude: ['id'],
                        optional: ['idContrato'],
                    }),
                },
            },
        })
        papelContrato: Omit<PapelContrato, 'id'>,
    ): Promise<PapelContrato> {
        return this.contratoRepository.papeis(id).create(papelContrato);
    }

    @patch('/contratoes/{id}/papel-contratoes', {
        responses: {
            '200': {
                description: 'Contrato.PapelContrato PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(PapelContrato, {partial: true}),
                },
            },
        })
        papelContrato: Partial<PapelContrato>,
        @param.query.object('where', getWhereSchemaFor(PapelContrato))
        where?: Where<PapelContrato>,
    ): Promise<Count> {
        return this.contratoRepository.papeis(id).patch(papelContrato, where);
    }

    @del('/contratoes/{id}/papel-contratoes', {
        responses: {
            '200': {
                description: 'Contrato.PapelContrato DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(PapelContrato))
        where?: Where<PapelContrato>,
    ): Promise<Count> {
        return this.contratoRepository.papeis(id).delete(where);
    }
}
