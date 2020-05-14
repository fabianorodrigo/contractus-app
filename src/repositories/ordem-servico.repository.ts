import {Getter, inject} from '@loopback/core';
import {
    BelongsToAccessor,
    DefaultTransactionalRepository,
    HasManyRepositoryFactory,
    repository,
} from '@loopback/repository';
import {ContractusDataSource} from '../datasources';
import {
    AreaRequisitante,
    EntregavelOrdemServico,
    EtapaOrdemServico,
    IndicadorOrdemServico,
    ItemOrdemServico,
    OrdemServico,
    OrdemServicoRelations,
} from '../models';
import {AreaRequisitanteRepository} from './area-requisitante.repository';
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

    public readonly areaRequisitante: BelongsToAccessor<AreaRequisitante, typeof OrdemServico.prototype.id>;

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
        @repository.getter('AreaRequisitanteRepository')
        protected areaRequisitanteRepositoryGetter: Getter<AreaRequisitanteRepository>,
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

    /*findByIdOrdemServicoFull(id: number): Promise<OrdemServicoFull>{
        return this.findById()
    }*/

    /**
     * Se a {ordemServico} já tiver o atributo 'numero' preenchido, retorna este valor
     * caso não tenha, atualiza o registro na base de dados com o MAX(numero)+1 (dentro do próximo contrato da OS)
     * e retorna este valor
     *
     * @param ordemServico ordem de serviço da qual deseja obter o Número de OS do contrato
     */
    async getNumeroOSContrato(ordemServico: OrdemServico): Promise<number> {
        //Se a OS já tem um número alocado, retorna o próprio
        if (ordemServico.numero) {
            return ordemServico.numero;
        } else {
            //Atualizando o número com o MAX + 1 e retornando o valor
            const result = await this.execute(
                `UPDATE contractusapp."TB_ORDEM_SERVICO"
                     SET "NR_ORDEM_SERVICO" = (SELECT coalesce(MAX("NR_ORDEM_SERVICO"),0)+1
							 FROM contractusapp."TB_ORDEM_SERVICO"
							 WHERE "ID_CONTRATO" = ${ordemServico.idContrato})
                    WHERE "ID_ORDEM_SERVICO" = ${ordemServico.id} RETURNING "NR_ORDEM_SERVICO"`,
                [],
            );
            return result.rows[0]['NR_ORDEM_SERVICO'];
        }
    }
}
