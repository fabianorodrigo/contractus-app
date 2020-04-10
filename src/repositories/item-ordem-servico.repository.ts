import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {ItemOrdemServico, ItemOrdemServicoRelations} from '../models';

export class ItemOrdemServicoRepository extends DefaultCrudRepository<
  ItemOrdemServico,
  typeof ItemOrdemServico.prototype.id,
  ItemOrdemServicoRelations
> {
  constructor(
    @inject('datasources.contractusDataSource')
    dataSource: ContractusDataSource,
  ) {
    super(ItemOrdemServico, dataSource);
  }
}
