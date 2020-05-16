import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EntregavelOrdemServico, EntregavelOrdemServicoRelations} from '../models';

export class EntregavelOrdemServicoRepository extends DefaultTransactionalRepository<
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
