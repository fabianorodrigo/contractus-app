import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EntregavelRecebimentoOrdemServico, EntregavelRecebimentoOrdemServicoRelations} from '../models';

export class EntregavelRecebimentoOrdemServicoRepository extends DefaultTransactionalRepository<
    EntregavelRecebimentoOrdemServico,
    typeof EntregavelRecebimentoOrdemServico.prototype.id,
    EntregavelRecebimentoOrdemServicoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(EntregavelRecebimentoOrdemServico, dataSource);
    }
}
