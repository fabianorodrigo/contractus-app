import {Getter, inject} from '@loopback/core';
import {DefaultTransactionalRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {EntregavelRecebimentoOrdemServico, RecebimentoOrdemServico, RecebimentoOrdemServicoRelations} from '../models';
import {EntregavelRecebimentoOrdemServicoRepository} from './entregavel-recebimento-ordem-servico.repository';

export class RecebimentoOrdemServicoRepository extends DefaultTransactionalRepository<
    RecebimentoOrdemServico,
    typeof RecebimentoOrdemServico.prototype.id,
    RecebimentoOrdemServicoRelations
> {
    public readonly entregaveis: HasManyRepositoryFactory<
        EntregavelRecebimentoOrdemServico,
        typeof RecebimentoOrdemServico.prototype.id
    >;

    constructor(
        @inject('datasources.contractusDataSource') dataSource: ContractusDataSource,
        @repository.getter('EntregavelRecebimentoOrdemServicoRepository')
        protected entregavelRecebimentoOrdemServicoRepositoryGetter: Getter<
            EntregavelRecebimentoOrdemServicoRepository
        >,
    ) {
        super(RecebimentoOrdemServico, dataSource);
        this.entregaveis = this.createHasManyRepositoryFactoryFor(
            'entregaveis',
            entregavelRecebimentoOrdemServicoRepositoryGetter,
        );
        this.registerInclusionResolver('entregaveis', this.entregaveis.inclusionResolver);
    }
}
