import {Getter, inject} from '@loopback/core';
import {DefaultTransactionalRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
    EntregavelOrdemServico,
    EtapaOrdemServico,
    IndicadorOrdemServico,
    ItemOrdemServico,
    OrdemServico,
    OrdemServicoRelations,
} from '../models';
import {EntregavelOrdemServicoRepository} from './entregavel-ordem-servico.repository';
import {EtapaOrdemServicoRepository} from './etapa-ordem-servico.repository';
import {IndicadorOrdemServicoRepository} from './indicador-ordem-servico.repository';
import {ItemOrdemServicoRepository} from './item-ordem-servico.repository';

export class OrdemServicoRepository extends DefaultTransactionalRepository<
    OrdemServico,
    typeof OrdemServico.prototype.id,
    OrdemServicoRelations
> {
    public readonly itens: HasManyRepositoryFactory<ItemOrdemServico, typeof OrdemServico.prototype.id>;

    public readonly etapas: HasManyRepositoryFactory<EtapaOrdemServico, typeof OrdemServico.prototype.id>;

    public readonly entregaveis: HasManyRepositoryFactory<EntregavelOrdemServico, typeof OrdemServico.prototype.id>;

    public readonly indicadores: HasManyRepositoryFactory<IndicadorOrdemServico, typeof OrdemServico.prototype.id>;

    constructor(
        @inject('datasources.contractusDataSource')
        dataSource: ContractusDataSource,
        @repository.getter('ItemOrdemServicoRepository')
        protected itemOrdemServicoRepositoryGetter: Getter<ItemOrdemServicoRepository>,
        @repository.getter('EtapaOrdemServicoRepository')
        protected etapaOrdemServicoRepositoryGetter: Getter<EtapaOrdemServicoRepository>,
        @repository.getter('EntregavelOrdemServicoRepository')
        protected entregavelOrdemServicoRepositoryGetter: Getter<EntregavelOrdemServicoRepository>,
        @repository.getter('IndicadorOrdemServicoRepository')
        protected indicadorOrdemServicoRepositoryGetter: Getter<IndicadorOrdemServicoRepository>,
    ) {
        super(OrdemServico, dataSource);
        this.indicadores = this.createHasManyRepositoryFactoryFor('indicadores', indicadorOrdemServicoRepositoryGetter);
        this.registerInclusionResolver('indicadores', this.indicadores.inclusionResolver);
        this.entregaveis = this.createHasManyRepositoryFactoryFor(
            'entregaveis',
            entregavelOrdemServicoRepositoryGetter,
        );
        this.registerInclusionResolver('entregaveis', this.entregaveis.inclusionResolver);
        this.etapas = this.createHasManyRepositoryFactoryFor('etapas', etapaOrdemServicoRepositoryGetter);
        this.registerInclusionResolver('etapas', this.etapas.inclusionResolver);
        this.itens = this.createHasManyRepositoryFactoryFor('itens', itemOrdemServicoRepositoryGetter);
        this.registerInclusionResolver('itens', this.itens.inclusionResolver);
    }
}
