import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {IndicadorOrdemServico, IndicadorOrdemServicoRelations} from '../models';

export class IndicadorOrdemServicoRepository extends DefaultTransactionalRepository<
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
