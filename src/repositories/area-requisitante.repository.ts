import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {AreaRequisitante, AreaRequisitanteRelations} from '../models';

export class AreaRequisitanteRepository extends DefaultCrudRepository<
    AreaRequisitante,
    typeof AreaRequisitante.prototype.id,
    AreaRequisitanteRelations
> {
    constructor(@inject('datasources.contractusDataSource') dataSource: ContractusDataSource) {
        super(AreaRequisitante, dataSource);
    }
}
