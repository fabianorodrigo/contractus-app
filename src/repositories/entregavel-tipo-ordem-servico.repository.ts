import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EntregaveisTipoOrdemServicoRelations, EntregavelTipoOrdemServico} from '../models';

export class EntregavelTipoOrdemServicoRepository extends DefaultTransactionalRepository<
    EntregavelTipoOrdemServico,
    typeof EntregavelTipoOrdemServico.prototype.id,
    EntregaveisTipoOrdemServicoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(EntregavelTipoOrdemServico, dataSource);
    }
}
