import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
  IndicadoresNiveisServicoContratoRelations,
  IndicadorNiveisServicoContrato,
  SancaoIndicadorNiveisServicoContrato,
} from '../models';
import {SancaoIndicadorNiveisServicoContratoRepository} from './sancao-indicador-niveis-servico-contrato.repository';

export class IndicadorNiveisServicoContratoRepository extends DefaultCrudRepository<
  IndicadorNiveisServicoContrato,
  typeof IndicadorNiveisServicoContrato.prototype.id,
  IndicadoresNiveisServicoContratoRelations
> {
  public readonly sancoes: HasManyRepositoryFactory<
    SancaoIndicadorNiveisServicoContrato,
    typeof IndicadorNiveisServicoContrato.prototype.id
  >;

  constructor(
    @inject('datasources.contractusDataSource')
    dataSource: ContractusDataSource,
    @repository.getter('SancaoIndicadorNiveisServicoContratoRepository')
    protected sancaoIndicadorNiveisServicoContratoRepositoryGetter: Getter<
      SancaoIndicadorNiveisServicoContratoRepository
    >,
  ) {
    super(IndicadorNiveisServicoContrato, dataSource);
    this.sancoes = this.createHasManyRepositoryFactoryFor(
      'sancoes',
      sancaoIndicadorNiveisServicoContratoRepositoryGetter,
    );
    this.registerInclusionResolver('sancoes', this.sancoes.inclusionResolver);
  }
}
