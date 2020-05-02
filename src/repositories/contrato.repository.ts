import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
    Contrato,
    ContratoRelations,
    Fornecedor,
    MetricaContrato,
    OrdemServico,
    PapelContrato,
    TipoOrdemServicoContrato,
} from '../models';
import {FornecedorRepository} from './fornecedor.repository';
import {MetricaContratoRepository} from './metrica-contrato.repository';
import {OrdemServicoRepository} from './ordem-servico.repository';
import {PapelContratoRepository} from './papel-contrato.repository';
import {TipoOrdemServicoContratoRepository} from './tipo-ordem-servico-contrato.repository';

export class ContratoRepository extends DefaultCrudRepository<
    Contrato,
    typeof Contrato.prototype.id,
    ContratoRelations
> {
    public readonly fornecedor: BelongsToAccessor<Fornecedor, typeof Contrato.prototype.id>;

    public readonly papeis: HasManyRepositoryFactory<PapelContrato, typeof Contrato.prototype.id>;

    public readonly metricas: HasManyRepositoryFactory<MetricaContrato, typeof Contrato.prototype.id>;

    public readonly tiposOrdemServico: HasManyRepositoryFactory<TipoOrdemServicoContrato, typeof Contrato.prototype.id>;

    public readonly ordensServico: HasManyRepositoryFactory<OrdemServico, typeof Contrato.prototype.id>;

    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
        @repository.getter('FornecedorRepository')
        protected fornecedorRepositoryGetter: Getter<FornecedorRepository>,
        @repository.getter('PapelContratoRepository')
        protected papelContratoRepositoryGetter: Getter<PapelContratoRepository>,
        @repository.getter('MetricaContratoRepository')
        protected metricaContratoRepositoryGetter: Getter<MetricaContratoRepository>,
        @repository.getter('TipoOrdemServicoContratoRepository')
        protected tipoOrdemServicoContratoRepositoryGetter: Getter<TipoOrdemServicoContratoRepository>,
        @repository.getter('OrdemServicoRepository')
        protected ordemServicoRepositoryGetter: Getter<OrdemServicoRepository>,
    ) {
        super(Contrato, dataSource);
        this.ordensServico = this.createHasManyRepositoryFactoryFor('ordensServico', ordemServicoRepositoryGetter);
        this.registerInclusionResolver('ordensServico', this.ordensServico.inclusionResolver);
        this.tiposOrdemServico = this.createHasManyRepositoryFactoryFor(
            'tiposOrdemServico',
            tipoOrdemServicoContratoRepositoryGetter,
        );
        this.registerInclusionResolver('tiposOrdemServico', this.tiposOrdemServico.inclusionResolver);
        this.metricas = this.createHasManyRepositoryFactoryFor('metricas', metricaContratoRepositoryGetter);
        this.registerInclusionResolver('metricas', this.metricas.inclusionResolver);
        this.papeis = this.createHasManyRepositoryFactoryFor('papeis', papelContratoRepositoryGetter);
        this.registerInclusionResolver('papeis', this.papeis.inclusionResolver);
        this.fornecedor = this.createBelongsToAccessorFor('fornecedor', fornecedorRepositoryGetter);
        this.registerInclusionResolver('fornecedor', this.fornecedor.inclusionResolver);
    }
}
