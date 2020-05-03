import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EtapaTipoOrdemServico, EtapaTipoOrdemServicoRelations} from '../models';

export class EtapaTipoOrdemServicoRepository extends DefaultCrudRepository<
    EtapaTipoOrdemServico,
    typeof EtapaTipoOrdemServico.prototype.id,
    EtapaTipoOrdemServicoRelations
> {
    constructor(@inject('datasources.contractusDataSource') dataSource: ContractusDataSource) {
        super(EtapaTipoOrdemServico, dataSource);
    }
}
