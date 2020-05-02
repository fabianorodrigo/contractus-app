import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EntregaveisTipoOrdemServicoRelations, EntregavelTipoOrdemServico} from '../models';

export class EntregavelTipoOrdemServicoRepository extends DefaultCrudRepository<
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
