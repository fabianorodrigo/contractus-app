import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Contrato, Fornecedor} from '../models';
import {ContratoRepository} from '../repositories';

@authenticate('jwt')
export class ContratoFornecedorController {
    constructor(
        @repository(ContratoRepository)
        public contratoRepository: ContratoRepository,
    ) {}

    @get('/contratoes/{id}/fornecedor', {
        responses: {
            '200': {
                description: 'Fornecedor belonging to Contrato',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Fornecedor)},
                    },
                },
            },
        },
    })
    async getFornecedor(@param.path.number('id') id: typeof Contrato.prototype.id): Promise<Fornecedor> {
        return this.contratoRepository.fornecedor(id);
    }
}
