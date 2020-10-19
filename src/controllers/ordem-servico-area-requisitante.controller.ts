import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {AreaRequisitante, OrdemServico} from '../models';
import {OrdemServicoRepository} from '../repositories';

@authenticate('jwt')
export class OrdemServicoAreaRequisitanteController {
    constructor(
        @repository(OrdemServicoRepository)
        public ordemServicoRepository: OrdemServicoRepository,
    ) {}

    @get('/ordem-servicos/{id}/area-requisitante', {
        responses: {
            '200': {
                description: 'AreaRequisitante belonging to OrdemServico',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(AreaRequisitante)},
                    },
                },
            },
        },
    })
    async getAreaRequisitante(
        @param.path.number('id') id: typeof OrdemServico.prototype.id,
    ): Promise<AreaRequisitante> {
        return this.ordemServicoRepository.areaRequisitante(id);
    }
}
