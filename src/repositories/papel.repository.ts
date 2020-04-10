import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {Papel, PapelRelations} from '../models';

export class PapelRepository extends DefaultCrudRepository<
  Papel,
  typeof Papel.prototype.id,
  PapelRelations
> {
  constructor(
    @inject('datasources.contractusDataSource')
    dataSource: ContractusDataSource,
  ) {
    super(Papel, dataSource);
  }
}
