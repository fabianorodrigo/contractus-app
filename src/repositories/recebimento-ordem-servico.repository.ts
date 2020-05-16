import {DefaultCrudRepository} from '@loopback/repository';
import {RecebimentoOrdemServico, RecebimentoOrdemServicoRelations} from '../models';
import {ContractusDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RecebimentoOrdemServicoRepository extends DefaultCrudRepository<
  RecebimentoOrdemServico,
  typeof RecebimentoOrdemServico.prototype.id,
  RecebimentoOrdemServicoRelations
> {
  constructor(
    @inject('datasources.contractusDataSource') dataSource: ContractusDataSourceDataSource,
  ) {
    super(RecebimentoOrdemServico, dataSource);
  }
}
