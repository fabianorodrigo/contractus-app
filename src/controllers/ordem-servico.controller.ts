import {service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {getAcoesOrdemServico, TipoUsoPermissoes, ValidationError} from '../commonLib';
import {EntregavelOrdemServico, EtapaOrdemServico, ItemOrdemServico, OrdemServico} from '../models';
import {OrdemServicoFull} from '../models/ordem-servico-full.model';
import {
    AreaRequisitanteRepository,
    ContratoRepository,
    EntregavelOrdemServicoRepository,
    EtapaOrdemServicoRepository,
    FornecedorRepository,
    IndicadorOrdemServicoRepository,
    ItemOrdemServicoRepository,
    OrdemServicoRepository,
} from '../repositories';
import {
    criarDocumento,
    criarIncluirDocumentoRequest,
    Documento,
    SeiService,
    SeiServiceProvider,
    TIPO_DOCUMENTO_ORDEM_SERVICO,
} from '../services';
import {tratarIncluirDocumentoResponse} from '../services/tratarIncluirDocumentoResponse';
import {converteOrdemServicoFullToOrdemServico} from './converteOrdemServicoFullToOrdemServico';
import {getHTMLOrdemServicoSEI} from './getHTMLOrdemServicoSEI';
import {getOrdemServicoSemRelacoes} from './getOrdemServicoSemRelacoes';
import {getValidaContrato} from './getValidaContrato';
import {AcaoGetOrdemServico, getValidaOrdemServico} from './getValidaOrdemServico'; // `log` is an interceptor function

/*const log: Interceptor = async (invocationCtx, next) => {
    console.log('log: before-' + invocationCtx.methodName);
    console.log(invocationCtx.args);
    // Wait until the interceptor/method chain returns
    const result = await next();
    console.log('log: after-' + invocationCtx.methodName);
    console.log(invocationCtx.args);
    return result;
};

@intercept(log)*/ export class OrdemServicoController {
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
        @repository(AreaRequisitanteRepository)
        public areaRequisitanteRepository: AreaRequisitanteRepository,
        @repository(FornecedorRepository)
        public fornecedorRepository: FornecedorRepository,
        @service(SeiServiceProvider)
        protected SEIService: SeiService,
    ) {}

    @post('/ordem-servico/emitirSEI/{id}', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {'application/json': {schema: getModelSchemaRef(OrdemServicoFull)}},
            },
        },
    })
    async incluirOSSEI(@param.path.number('id') id: number): Promise<OrdemServicoFull> {
        //busca a ordem de serviço com todas as suas relações
        const ordemServico = await getValidaOrdemServico(
            this.ordemServicoRepository,
            id as number,
            AcaoGetOrdemServico.Emissao_SEI,
        );
        if (ordemServico.numeroDocumentoOrdemServicoSEI || ordemServico.linkOrdemServicoSEI) {
            throw new Error(
                `Ordem de Serviço já foi emitida. SEI: ${ordemServico.numeroDocumentoOrdemServicoSEI} - ${ordemServico.linkOrdemServicoSEI}`,
            );
        }
        const contrato = await getValidaContrato(this.contratoRepository, ordemServico.idContrato);
        const areaRequisitante = await this.areaRequisitanteRepository.findById(ordemServico.idAreaRequisitante);
        const fornecedor = await this.fornecedorRepository.findById(contrato.idFornecedor);
        const tipoOS = contrato.tiposOrdemServico.find((tos) => tos.id == ordemServico.idTipoOrdemServicoContrato);
        if (!tipoOS) throw new Error(`Tipo de Ordem de Serviço não encontrado no Contrato`);
        //reserva número da OS e atribui ao objeto
        ordemServico.numero = await this.ordemServicoRepository.getNumeroOSContrato(ordemServico);
        //data de emisão = HOJE
        ordemServico.dtEmissao = new Date().toISOString();
        //Gera documento HTML a ser enviado para o SEI
        const htmlDocumento: string = getHTMLOrdemServicoSEI(
            ordemServico,
            contrato,
            tipoOS,
            fornecedor,
            areaRequisitante,
        );

        const doc: Documento = criarDocumento(
            areaRequisitante.numeroProcessoOrdensServicoSEI,
            TIPO_DOCUMENTO_ORDEM_SERVICO,
            String(ordemServico.numero).padStart(3, '0'),
            `Ordem de Serviço ${String(ordemServico.numero).padStart(3, '0')} - Contrato ${contrato.numeroContrato}/${
                contrato.anoContrato
            }`,
            Buffer.from(htmlDocumento).toString('base64'),
        );
        let documentoSEI = null;

        try {
            documentoSEI = tratarIncluirDocumentoResponse(
                await this.SEIService.incluirDocumento(criarIncluirDocumentoRequest(doc)),
            );
            ordemServico.numeroDocumentoOrdemServicoSEI = parseInt(documentoSEI.parametros.DocumentoFormatado);
            ordemServico.linkOrdemServicoSEI = documentoSEI.parametros.LinkAcesso;
        } catch (e) {
            let msgDetalhe = '';
            const regExp = /Processo \[(.+)\] não encontrado/;
            let m: RegExpExecArray | null = regExp.exec(e.message);
            if (m != null) {
                msgDetalhe = ` Processo vinculado à Área Requisitante não foi encontrado: ${m[1]}`;
            }
            throw new ValidationError(404, `Falha ao fazer a integração com o SEI.${msgDetalhe}`);
        }

        //para atualizar a ordem de serviço, precisa remover os atributos de relações com outras entidades
        await this.ordemServicoRepository.replaceById(ordemServico.id, getOrdemServicoSemRelacoes(ordemServico));
        return ordemServico;
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
        //limpa os itens pois serão inseridos os com id retornados da criação via repositório de itens
        osRetorno.itens = [];
        osRetorno.entregaveis = [];
        osRetorno.etapas = [];
        osRetorno.indicadores = [];

        //clona OS e remove atributos de relações pois o repository não aceita
        const ordemServico: OrdemServico = converteOrdemServicoFullToOrdemServico(osc);

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
        //clona OS e remove atributos de relações pois o repository não aceita
        const ordemServico: OrdemServico = converteOrdemServicoFullToOrdemServico(osc);
        const transacao = await this.ordemServicoRepository.beginTransaction();
        try {
            await this.ordemServicoRepository.replaceById(id, ordemServico, {
                transaction: transacao,
            });
            for await (let i of osc.itens) {
                const item: ItemOrdemServico = i as ItemOrdemServico;
                if (item.hasOwnProperty('toDelete')) {
                    await this.itemOrdemServicoRepository.deleteById(item.id, {
                        transaction: transacao,
                    });
                } else if (item.id) {
                    await this.itemOrdemServicoRepository.updateById(item.id, item, {
                        transaction: transacao,
                    });
                } else {
                    await this.itemOrdemServicoRepository.create(item, {
                        transaction: transacao,
                    });
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
                    await this.entregavelOrdemServicoRepository.create(entregavel, {
                        transaction: transacao,
                    });
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
        //objeto validador das ações habilitadas com a opção de lançar exceção em caso de impossibilidade
        const permissoesEtapa = getAcoesOrdemServico(TipoUsoPermissoes.VALIDAR_SERVIDOR, ordemServico);
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
