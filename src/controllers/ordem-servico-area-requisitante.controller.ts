import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrdemServico,
  AreaRequisitante,
} from '../models';
import {OrdemServicoRepository} from '../repositories';

export class OrdemServicoAreaRequisitanteController {
  constructor(
    @repository(OrdemServicoRepository)
    public ordemServicoRepository: OrdemServicoRepository,
  ) { }

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
