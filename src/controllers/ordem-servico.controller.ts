import {service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {EntregavelOrdemServico, EtapaOrdemServico, ItemOrdemServico, OrdemServico} from '../models';
import {getStatusOrdemServico} from '../models/getStatusOrdemServico';
import {OrdemServicoFull} from '../models/ordem-servico-full.model';
import {StatusOrdemServico} from '../models/StatusOrdemServico';
import {
    ContratoRepository,
    EntregavelOrdemServicoRepository,
    EtapaOrdemServicoRepository,
    IndicadorOrdemServicoRepository,
    ItemOrdemServicoRepository,
    OrdemServicoRepository,
} from '../repositories';
import {
    createDocumento,
    createIncluirDocumentoRequest,
    Documento,
    incluirDocumentoResponse,
    OPENAPI_INCLUIR_DOCUMENTO_RESPONSE,
    SeiService,
    SeiServiceProvider,
} from '../services';
import {AcaoGetOrdemServico, getValidaOrdemServico} from './getValidaOrdemServico';

export class OrdemServicoController {
    constructor(
        @repository(OrdemServicoRepository)
        public ordemServicoRepository: OrdemServicoRepository,
        @repository(ItemOrdemServicoRepository)
        public itemOrdemServicoRepository: ItemOrdemServicoRepository,
        @repository(EtapaOrdemServicoRepository)
        public etapaOrdemServicoRepository: EtapaOrdemServicoRepository,
        @repository(EntregavelOrdemServicoRepository)
        public entregavelOrdemServicoRepository: EntregavelOrdemServicoRepository,
        @repository(IndicadorOrdemServicoRepository)
        public indicadorOrdemServicoRepository: IndicadorOrdemServicoRepository,
        @repository(ContratoRepository)
        public contratoRepository: ContratoRepository,
        @service(SeiServiceProvider)
        protected SEIService: SeiService,
    ) {}

    // Map to `GET /ping`
    @post('/ordem-servico/emitirSEI', {
        responses: {
            '200': OPENAPI_INCLUIR_DOCUMENTO_RESPONSE,
        },
    })
    async incluirOSSEI(@requestBody() osc: OrdemServicoFull): Promise<incluirDocumentoResponse> {
        //busca a ordem de serviço com todas as suas relações
        const ordemServico = await getValidaOrdemServico(
            this.ordemServicoRepository,
            osc.id as number,
            AcaoGetOrdemServico.Emissao_SEI,
        );
        const contrato = await this.contratoRepository.findById(ordemServico.idContrato);
        if (!contrato.numeroProcessoOrdensServico) {
            throw new Error(
                `O Contrato ${contrato.numeroContrato}/${contrato.anoContrato} não possui um Número do Processo para inclusão de Ordens de Serviço`,
            );
        }
        const doc: Documento = createDocumento(
            '01416.022861/2017-86', //FIXME: contrato.numeroProcessoOrdensServico,
            'todo',
            `Ordem de Serviço #todo# - Contrato ${contrato.numeroContrato}/${contrato.anoContrato}`,
            Buffer.from('teste').toString('base64'),
        );
        try {
            const teste = await this.SEIService.incluirDocumento(createIncluirDocumentoRequest(doc));
            console.log(teste);
        } catch (e) {
            console.error(e);
        }
        return this.SEIService.incluirDocumento(createIncluirDocumentoRequest(doc));
    }

    @post('/ordem-servico', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {'application/json': {schema: getModelSchemaRef(OrdemServicoFull)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(OrdemServicoFull, {
                        title: 'NewOrdemServicoFull',
                        exclude: ['id'],
                    }),
                },
            },
        })
        osc: Omit<OrdemServicoFull, 'id'>,
    ): Promise<OrdemServicoFull> {
        const osRetorno: OrdemServicoFull = JSON.parse(JSON.stringify(osc));
        osRetorno.itens = []; //limpa os itens pois serão inseridos os com id retornados da criação via repositório de itens

        const ordemServico: OrdemServico = JSON.parse(JSON.stringify(osc)); //clone OS
        //remove atributos de relações pois o repository não aceita
        delete ordemServico.itens;
        delete ordemServico.entregaveis;
        delete ordemServico.etapas;
        delete ordemServico.indicadores;

        const transacao = await this.ordemServicoRepository.beginTransaction();
        try {
            osRetorno.id = (
                await this.ordemServicoRepository.create(ordemServico, {
                    transaction: transacao,
                })
            ).id;
            for await (let i of osc.itens) {
                const item: ItemOrdemServico = i as ItemOrdemServico;
                item.idOrdemServico = osRetorno.id as number;
                osRetorno.itens.push(
                    await this.itemOrdemServicoRepository.create(item, {
                        transaction: transacao,
                    }),
                );
            }
            for await (let i of osc.etapas) {
                //Remove a propriedade de controle que colocamos na interface para decidir se carrega ou não
                //as entregas default do tipo de OS do contrato (se o usuário já mexeu na coleção, não carrega)
                delete (i as any).auto;
                const etapa: EtapaOrdemServico = i as EtapaOrdemServico;
                etapa.idOrdemServico = osRetorno.id as number;
                osRetorno.itens.push(
                    await this.etapaOrdemServicoRepository.create(etapa, {
                        transaction: transacao,
                    }),
                );
            }
            for await (let i of osc.entregaveis) {
                //Remove a propriedade de controle que colocamos na interface para decidir se carrega ou não
                //os entregáveis default do contrato (se o usuário já mexeu na coleção, não carrega)
                delete (i as any).auto;
                const entregavel: EntregavelOrdemServico = i as EntregavelOrdemServico;
                entregavel.idOrdemServico = osRetorno.id as number;
                osRetorno.itens.push(
                    await this.entregavelOrdemServicoRepository.create(entregavel, {
                        transaction: transacao,
                    }),
                );
            }
            await transacao.commit();
        } catch (e) {
            console.error(e);
            await transacao.rollback();
            throw e;
        }
        return osRetorno;
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
        const transacao = await this.ordemServicoRepository.beginTransaction();
        try {
            await this.ordemServicoRepository.replaceById(id, ordemServico, {transaction: transacao});
            for await (let i of osc.itens) {
                const item: ItemOrdemServico = i as ItemOrdemServico;
                if (item.hasOwnProperty('toDelete')) {
                    await this.itemOrdemServicoRepository.deleteById(item.id, {transaction: transacao});
                } else if (item.id) {
                    await this.itemOrdemServicoRepository.updateById(item.id, item, {transaction: transacao});
                } else {
                    await this.itemOrdemServicoRepository.create(item, {transaction: transacao});
                }
            }
            for await (let i of osc.etapas) {
                //Remove a propriedade de controle que colocamos na interface para decidir se carrega ou não
                //as etapas default do contrato (se o usuário já mexeu na coleção, não carrega)
                delete (i as any).auto;
                const etapa: EtapaOrdemServico = i as EtapaOrdemServico;
                if (etapa.hasOwnProperty('toDelete')) {
                    await this.etapaOrdemServicoRepository.deleteById(etapa.id, {
                        transaction: transacao,
                    });
                } else if (etapa.id) {
                    await this.etapaOrdemServicoRepository.updateById(etapa.id, etapa, {
                        transaction: transacao,
                    });
                } else {
                    await this.etapaOrdemServicoRepository.create(etapa, {
                        transaction: transacao,
                    });
                }
            }
            for await (let i of osc.entregaveis) {
                //Remove a propriedade de controle que colocamos na interface para decidir se carrega ou não
                //os entregáveis default do contrato (se o usuário já mexeu na coleção, não carrega)
                delete (i as any).auto;
                const entregavel: EntregavelOrdemServico = i as EntregavelOrdemServico;

                if (entregavel.hasOwnProperty('toDelete')) {
                    await this.entregavelOrdemServicoRepository.deleteById(entregavel.id, {
                        transaction: transacao,
                    });
                } else if (entregavel.id) {
                    await this.entregavelOrdemServicoRepository.updateById(entregavel.id, entregavel, {
                        transaction: transacao,
                    });
                } else {
                    await this.entregavelOrdemServicoRepository.create(entregavel, {transaction: transacao});
                }
            }
            await transacao.commit();
        } catch (e) {
            console.error(e);
            await transacao.rollback();
            throw e;
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
        //busca a ordem de serviço com todas as suas relações
        const ordemServico = await this.ordemServicoRepository.findById(id, {
            include: [{relation: 'itens'}, {relation: 'etapas'}, {relation: 'entregaveis'}, {relation: 'indicadores'}],
        });
        //Só exclui se ainda estiver no status RASCUNHO
        if (getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO) {
            const transacao = await this.ordemServicoRepository.beginTransaction();
            try {
                if (ordemServico.itens) {
                    for await (let item of ordemServico.itens) {
                        await this.itemOrdemServicoRepository.deleteById(item.id, {transaction: transacao});
                    }
                }
                if (ordemServico.etapas) {
                    for await (let etapa of ordemServico.etapas) {
                        await this.etapaOrdemServicoRepository.deleteById(etapa.id, {transaction: transacao});
                    }
                }
                if (ordemServico.entregaveis) {
                    for await (let entregavel of ordemServico.entregaveis) {
                        await this.entregavelOrdemServicoRepository.deleteById(entregavel.id, {
                            transaction: transacao,
                        });
                    }
                }
                if (ordemServico.indicadores) {
                    for await (let indicador of ordemServico.indicadores) {
                        await this.indicadorOrdemServicoRepository.deleteById(indicador.id, {
                            transaction: transacao,
                        });
                    }
                }

                await this.ordemServicoRepository.deleteById(id);
                await transacao.commit();
            } catch (e) {
                console.error(e);
                await transacao.rollback();
                throw e;
            }
        }
    }
}
