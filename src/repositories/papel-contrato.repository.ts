import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {PapeisContratoRelations, PapelContrato} from '../models';

export class PapelContratoRepository extends DefaultCrudRepository<
    PapelContrato,
    typeof PapelContrato.prototype.id,
    PapeisContratoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(PapelContrato, dataSource);
    }
}
