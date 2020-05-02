import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {IndicadorOrdemServico, IndicadorOrdemServicoRelations} from '../models';

export class IndicadorOrdemServicoRepository extends DefaultCrudRepository<
    IndicadorOrdemServico,
    typeof IndicadorOrdemServico.prototype.id,
    IndicadorOrdemServicoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(IndicadorOrdemServico, dataSource);
    }
}
