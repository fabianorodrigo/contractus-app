import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {RecebimentoOrdemServico, RecebimentoOrdemServicoRelations} from '../models';

export class RecebimentoOrdemServicoRepository extends DefaultCrudRepository<
    RecebimentoOrdemServico,
    typeof RecebimentoOrdemServico.prototype.id,
    RecebimentoOrdemServicoRelations
> {
    constructor(@inject('datasources.contractusDataSource') dataSource: ContractusDataSource) {
        super(RecebimentoOrdemServico, dataSource);
    }
}
