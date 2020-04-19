import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {ItemOrdemServico, ItemOrdemServicoRelations} from '../models';

export class ItemOrdemServicoRepository extends DefaultTransactionalRepository<
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
