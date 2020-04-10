import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
  SancaoIndicadorNiveisServicoContrato,
  SancoesIndicadorNiveisServicoContratoRelations,
} from '../models';

export class SancaoIndicadorNiveisServicoContratoRepository extends DefaultCrudRepository<
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
