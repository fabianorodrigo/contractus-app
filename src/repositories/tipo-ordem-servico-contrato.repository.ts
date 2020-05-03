import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
    EntregavelTipoOrdemServico,
    EtapaTipoOrdemServico,
    IndicadorNiveisServicoContrato,
    TipoOrdemServicoContrato,
    TiposOrdemServicoContratoRelations,
} from '../models';
import {EntregavelTipoOrdemServicoRepository} from './entregavel-tipo-ordem-servico.repository';
import {EtapaTipoOrdemServicoRepository} from './etapa-tipo-ordem-servico.repository';
import {IndicadorNiveisServicoContratoRepository} from './indicador-niveis-servico-contrato.repository';

export class TipoOrdemServicoContratoRepository extends DefaultCrudRepository<
    TipoOrdemServicoContrato,
    typeof TipoOrdemServicoContrato.prototype.id,
    TiposOrdemServicoContratoRelations
> {
    public readonly entregaveis: HasManyRepositoryFactory<
        EntregavelTipoOrdemServico,
        typeof TipoOrdemServicoContrato.prototype.id
    >;

    public readonly indicadores: HasManyRepositoryFactory<
        IndicadorNiveisServicoContrato,
        typeof TipoOrdemServicoContrato.prototype.id
    >;

    public readonly etapas: HasManyRepositoryFactory<
        EtapaTipoOrdemServico,
        typeof TipoOrdemServicoContrato.prototype.id
    >;

    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
        @repository.getter('EntregavelTipoOrdemServicoRepository')
        protected entregavelTipoOrdemServicoRepositoryGetter: Getter<EntregavelTipoOrdemServicoRepository>,
        @repository.getter('IndicadorNiveisServicoContratoRepository')
        protected indicadorNiveisServicoContratoRepositoryGetter: Getter<IndicadorNiveisServicoContratoRepository>,
        @repository.getter('EtapaTipoOrdemServicoRepository')
        protected etapaTipoOrdemServicoRepositoryGetter: Getter<EtapaTipoOrdemServicoRepository>,
    ) {
        super(TipoOrdemServicoContrato, dataSource);
        this.etapas = this.createHasManyRepositoryFactoryFor('etapas', etapaTipoOrdemServicoRepositoryGetter);
        this.registerInclusionResolver('etapas', this.etapas.inclusionResolver);
        this.indicadores = this.createHasManyRepositoryFactoryFor(
            'indicadores',
            indicadorNiveisServicoContratoRepositoryGetter,
        );
        this.registerInclusionResolver('indicadores', this.indicadores.inclusionResolver);
        this.entregaveis = this.createHasManyRepositoryFactoryFor(
            'entregaveis',
            entregavelTipoOrdemServicoRepositoryGetter,
        );
        this.registerInclusionResolver('entregaveis', this.entregaveis.inclusionResolver);
        this.etapas = this.createHasManyRepositoryFactoryFor('etapas', etapaTipoOrdemServicoRepositoryGetter);
        this.registerInclusionResolver('etapas', this.etapas.inclusionResolver);
    }
}
