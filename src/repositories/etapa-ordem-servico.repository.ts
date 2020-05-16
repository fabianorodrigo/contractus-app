import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EtapaOrdemServico, EtapaOrdemServicoRelations} from '../models';

export class EtapaOrdemServicoRepository extends DefaultTransactionalRepository<
    EtapaOrdemServico,
    typeof EtapaOrdemServico.prototype.id,
    EtapaOrdemServicoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(EtapaOrdemServico, dataSource);
    }
}
