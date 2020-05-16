import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {SancaoIndicadorNiveisServicoContrato, SancoesIndicadorNiveisServicoContratoRelations} from '../models';

export class SancaoIndicadorNiveisServicoContratoRepository extends DefaultTransactionalRepository<
    SancaoIndicadorNiveisServicoContrato,
    typeof SancaoIndicadorNiveisServicoContrato.prototype.id,
    SancoesIndicadorNiveisServicoContratoRelations
> {
    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
    ) {
        super(SancaoIndicadorNiveisServicoContrato, dataSource);
    }
}
