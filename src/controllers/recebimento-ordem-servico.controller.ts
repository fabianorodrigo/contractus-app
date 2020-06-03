import {service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {ValidationError} from '../commonLib';
import {TipoRecebimentoOrdemServico} from '../commonLib/interface-models/TipoRecebimentoOrdemServico';
import {EntregavelRecebimentoOrdemServico, RecebimentoOrdemServico} from '../models';
import {RecebimentoOrdemServicoFull} from '../models/recebimento-ordem-servico-full.model';
import {
    AreaRequisitanteRepository,
    ContratoRepository,
    FornecedorRepository,
    OrdemServicoRepository,
    RecebimentoOrdemServicoRepository,
} from '../repositories';
import {EntregavelRecebimentoOrdemServicoRepository} from '../repositories/entregavel-recebimento-ordem-servico.repository';
import {
    criarDocumento,
    criarIncluirDocumentoRequest,
    Documento,
    SeiService,
    SeiServiceProvider,
    TIPO_DOCUMENTO_TERMO_RECEBIMENTO_DEFINITIVO,
    TIPO_DOCUMENTO_TERMO_RECEBIMENTO_PROVISORIO,
} from '../services';
import {tratarIncluirDocumentoResponse} from '../services/tratarIncluirDocumentoResponse';
import {converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico} from './converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico';
import {getHTMLTermoRecebimentoSEI} from './getHTMLTermoRecebimentoSEI';
import {getValidaContrato} from './getValidaContrato';
import {AcaoGetOrdemServico, getValidaOrdemServico} from './getValidaOrdemServico';

export class RecebimentoOrdemServicoController {
    constructor(
        @repository(RecebimentoOrdemServicoRepository)
        public recebimentoOrdemServicoRepository: RecebimentoOrdemServicoRepository,
        @repository(EntregavelRecebimentoOrdemServicoRepository)
        public entregavelRecebimentoOrdemServicoRepository: EntregavelRecebimentoOrdemServicoRepository,
        @repository(OrdemServicoRepository)
        public ordemServicoRepository: OrdemServicoRepository,
        @repository(ContratoRepository)
        public contratoRepository: ContratoRepository,
        @repository(AreaRequisitanteRepository)
        public areaRequisitanteRepository: AreaRequisitanteRepository,
        @repository(FornecedorRepository)
        public fornecedorRepository: FornecedorRepository,
        @service(SeiServiceProvider)
        protected SEIService: SeiService,
    ) {}

    @post('/recebimento-ordem-servico', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico model instance',
                content: {'application/json': {schema: getModelSchemaRef(RecebimentoOrdemServicoFull)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(RecebimentoOrdemServicoFull, {
                        title: 'NewRecebimentoOrdemServico',
                        exclude: ['id'],
                    }),
                },
            },
        })
        recebimentoOrdemServico: Omit<RecebimentoOrdemServicoFull, 'id'>,
    ): Promise<RecebimentoOrdemServicoFull> {
        const ordemServico = await getValidaOrdemServico(
            this.ordemServicoRepository,
            recebimentoOrdemServico.idOrdemServico,
            recebimentoOrdemServico.tipoRecebimento == TipoRecebimentoOrdemServico.DEFINITIVO
                ? AcaoGetOrdemServico.Emissao_TRD_SEI
                : AcaoGetOrdemServico.Emissao_TRP_SEI,
        );
        const contrato = await getValidaContrato(this.contratoRepository, ordemServico.idContrato);
        const areaRequisitante = await this.areaRequisitanteRepository.findById(ordemServico.idAreaRequisitante);
        const fornecedor = await this.fornecedorRepository.findById(contrato.idFornecedor);
        const tipoOS = contrato.tiposOrdemServico.find((tos) => tos.id == ordemServico.idTipoOrdemServicoContrato);
        if (!tipoOS) throw new Error(`Tipo de Ordem de Serviço não encontrado no Contrato`);

        //Gera documento HTML a ser enviado para o SEI
        const htmlDocumento: string = getHTMLTermoRecebimentoSEI(
            recebimentoOrdemServico,
            ordemServico,
            contrato,
            tipoOS,
            fornecedor,
            areaRequisitante,
        );

        const doc: Documento = criarDocumento(
            areaRequisitante.numeroProcessoOrdensServicoSEI,
            recebimentoOrdemServico.tipoRecebimento == TipoRecebimentoOrdemServico.DEFINITIVO
                ? TIPO_DOCUMENTO_TERMO_RECEBIMENTO_DEFINITIVO
                : TIPO_DOCUMENTO_TERMO_RECEBIMENTO_PROVISORIO,
            '',
            `Termo de Recebimento ${
                recebimentoOrdemServico.tipoRecebimento == TipoRecebimentoOrdemServico.DEFINITIVO
                    ? 'Definitivo'
                    : 'Provisório'
            }: OS ${String(ordemServico.numero).padStart(3, '0')} - Contrato ${contrato.numeroContrato}/${
                contrato.anoContrato
            }`,
            Buffer.from(htmlDocumento).toString('base64'),
        );
        let documentoSEI = null;

        try {
            documentoSEI = tratarIncluirDocumentoResponse(
                await this.SEIService.incluirDocumento(criarIncluirDocumentoRequest(doc)),
            );
            recebimentoOrdemServico.numeroDocumentoTermoRecebimentoSEI = parseInt(
                documentoSEI.parametros.DocumentoFormatado,
            );
            recebimentoOrdemServico.linkTermoRecebimentoSEI = documentoSEI.parametros.LinkAcesso;
        } catch (e) {
            let msgDetalhe = '';
            const regExp = /Processo \[(.+)\] não encontrado/;
            let m: RegExpExecArray | null = regExp.exec(e.message);
            if (m != null) {
                msgDetalhe = ` Processo vinculado à Área Requisitante não foi encontrado: ${m[1]}`;
            }
            console.error(e);
            throw new ValidationError(404, `Falha ao fazer a integração com o SEI.${msgDetalhe}`);
        }

        const recebimentoRetorno: RecebimentoOrdemServicoFull = JSON.parse(JSON.stringify(recebimentoOrdemServico));
        //limpa os entregaveis pois serão inseridos os com id retornados da criação via repositório
        recebimentoRetorno.entregaveis = [];

        //clona OS e remove atributos de relações pois o repository não aceita
        const recebimento: RecebimentoOrdemServico = converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico(
            recebimentoOrdemServico,
        );

        const transacao = await this.recebimentoOrdemServicoRepository.beginTransaction();
        try {
            recebimentoRetorno.id = (
                await this.recebimentoOrdemServicoRepository.create(recebimento, {
                    transaction: transacao,
                })
            ).id;

            for await (let i of recebimentoOrdemServico.entregaveis) {
                //Remove a propriedade de controle que colocamos na interface para decidir se carrega ou não
                //os entregáveis default do contrato (se o usuário já mexeu na coleção, não carrega)
                delete (i as any).auto;
                const entregavel: EntregavelRecebimentoOrdemServico = i as EntregavelRecebimentoOrdemServico;
                entregavel.idRecebimentoOrdemServico = recebimentoRetorno.id as number;
                recebimentoRetorno.entregaveis.push(
                    await this.entregavelRecebimentoOrdemServicoRepository.create(entregavel, {
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
        return recebimentoRetorno;
    }

    @get('/recebimento-ordem-servico/count', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(@param.where(RecebimentoOrdemServico) where?: Where<RecebimentoOrdemServico>): Promise<Count> {
        return this.recebimentoOrdemServicoRepository.count(where);
    }

    @get('/recebimento-ordem-servico', {
        responses: {
            '200': {
                description: 'Array of RecebimentoOrdemServico model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(RecebimentoOrdemServico, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(RecebimentoOrdemServico) filter?: Filter<RecebimentoOrdemServico>,
    ): Promise<RecebimentoOrdemServico[]> {
        return this.recebimentoOrdemServicoRepository.find(filter);
    }

    @patch('/recebimento-ordem-servico', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(RecebimentoOrdemServico, {partial: true}),
                },
            },
        })
        recebimentoOrdemServico: RecebimentoOrdemServico,
        @param.where(RecebimentoOrdemServico) where?: Where<RecebimentoOrdemServico>,
    ): Promise<Count> {
        return this.recebimentoOrdemServicoRepository.updateAll(recebimentoOrdemServico, where);
    }

    @get('/recebimento-ordem-servico/{id}', {
        responses: {
            '200': {
                description: 'RecebimentoOrdemServico model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(RecebimentoOrdemServico, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(RecebimentoOrdemServico, {exclude: 'where'})
        filter?: FilterExcludingWhere<RecebimentoOrdemServico>,
    ): Promise<RecebimentoOrdemServico> {
        return this.recebimentoOrdemServicoRepository.findById(id, filter);
    }

    @patch('/recebimento-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'RecebimentoOrdemServico PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(RecebimentoOrdemServico, {partial: true}),
                },
            },
        })
        recebimentoOrdemServico: RecebimentoOrdemServico,
    ): Promise<void> {
        await this.recebimentoOrdemServicoRepository.updateById(id, recebimentoOrdemServico);
    }

    @put('/recebimento-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'RecebimentoOrdemServico PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() recebimentoOrdemServico: RecebimentoOrdemServico,
    ): Promise<void> {
        await this.recebimentoOrdemServicoRepository.replaceById(id, recebimentoOrdemServico);
    }

    @del('/recebimento-ordem-servico/{id}', {
        responses: {
            '204': {
                description: 'RecebimentoOrdemServico DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.recebimentoOrdemServicoRepository.deleteById(id);
    }
}
