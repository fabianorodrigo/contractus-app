import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
  EntregavelOrdemServico,
  EntregavelOrdemServicoRelations,
} from '../models';

export class EntregavelOrdemServicoRepository extends DefaultCrudRepository<
  EntregavelOrdemServico,
  typeof EntregavelOrdemServico.prototype.id,
  EntregavelOrdemServicoRelations
> {
  constructor(
    @inject('datasources.contractusDataSource')
    dataSource: ContractusDataSource,
  ) {
    super(EntregavelOrdemServico, dataSource);
  }
}
