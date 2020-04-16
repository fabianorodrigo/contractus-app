import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {ItemOrdemServico, OrdemServico} from '../models';
import {OrdemServicoFull} from '../models/ordem-servico-full.model';
import {ItemOrdemServicoRepository, OrdemServicoRepository} from '../repositories';

export class OrdemServicoController {
    constructor(
        @repository(OrdemServicoRepository)
        public ordemServicoRepository: OrdemServicoRepository,
        @repository(ItemOrdemServicoRepository)
        public itemOrdemServicoRepository: ItemOrdemServicoRepository,
    ) {}

    @post('/ordem-servico', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {
                    'application/json': {schema: getModelSchemaRef(OrdemServico)},
                },
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServico, {
                        title: 'Nova Ordem de Serviço',
                        exclude: ['id'],
                    }),
                },
            },
        })
        ordemServico: Omit<OrdemServico, 'id'>,
    ): Promise<OrdemServico> {
        return this.ordemServicoRepository.create(ordemServico);
    }

    @get('/ordem-servico/count', {
        responses: {
            '200': {
                description: 'OrdemServico model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(OrdemServico) where?: Where<OrdemServico>): Promise<Count> {
        return this.ordemServicoRepository.count(where);
    }

    @get('/ordem-servico', {
        responses: {
            '200': {
                description: 'Array de Ordem de Serviço',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(OrdemServico, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(@param.filter(OrdemServico) filter?: Filter<OrdemServico>): Promise<OrdemServico[]> {
        return this.ordemServicoRepository.find(filter);
    }

    @patch('/ordem-servico', {
        responses: {
            '200': {
                description: 'OrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServico, {partial: true}),
                },
            },
        })
        ordemServico: OrdemServico,
        @param.where(OrdemServico) where?: Where<OrdemServico>,
    ): Promise<Count> {
        return this.ordemServicoRepository.updateAll(ordemServico, where);
    }

    @get('/ordem-servico/{id}', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(OrdemServico, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(OrdemServico, {exclude: 'where'})
        filter?: FilterExcludingWhere<OrdemServico>,
    ): Promise<OrdemServico> {
        return this.ordemServicoRepository.findById(id, filter);
    }

    @patch('/ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'OrdemServico PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServico, {partial: true}),
                },
            },
        })
        ordemServico: OrdemServico,
    ): Promise<void> {
        await this.ordemServicoRepository.updateById(id, ordemServico);
    }

    @put('/ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'Ordem de Serviço atualizada com sucesso',
            },
        },
    })
    async replaceById(@param.path.number('id') id: number, @requestBody() osc: OrdemServicoFull): Promise<void> {
        const ordemServico: OrdemServico = new OrdemServico({
            id: osc.id,
            idContrato: osc.idContrato,
            numero: osc.numero,
            emergencial: osc.emergencial,
            idTipoOrdemServicoContrato: osc.idTipoOrdemServicoContrato,
            dtEmissao: osc.dtEmissao,
            idProjeto: osc.idProjeto,
            idProduto: osc.idProduto,
            cpfRequisitante: osc.cpfRequisitante,
            nomeRequisitante: osc.nomeRequisitante,
            cpfFiscalTecnico: osc.cpfFiscalTecnico,
            nomeFiscalTecnico: osc.nomeFiscalTecnico,
            numeroDocumentoSEIOrdemServico: osc.numeroDocumentoSEIOrdemServico,
            numeroDocumentoSEITermoRecebimentoDefinitivo: osc.numeroDocumentoSEITermoRecebimentoDefinitivo,
            dtCancelamento: osc.dtCancelamento,
        });
        await this.ordemServicoRepository.replaceById(id, ordemServico);
        for await (let i of osc.itens) {
            const item: ItemOrdemServico = i as ItemOrdemServico;
            console.log(item);
            if (item.hasOwnProperty('toDelete')) {
                await this.itemOrdemServicoRepository.deleteById(item.id);
            } else if (item.id) {
                await this.itemOrdemServicoRepository.updateById(item.id, item);
            } else {
                await this.itemOrdemServicoRepository.create(item);
            }
        }
    }

    @del('/ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'OrdemServico DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.ordemServicoRepository.deleteById(id);
    }
}
