import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {EntregavelRecebimentoOrdemServico, RecebimentoOrdemServico} from '../models';
import {RecebimentoOrdemServicoFull} from '../models/recebimento-ordem-servico-full.model';
import {RecebimentoOrdemServicoRepository} from '../repositories';
import {EntregavelRecebimentoOrdemServicoRepository} from '../repositories/entregavel-recebimento-ordem-servico.repository';
import {converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico} from './converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico';

export class RecebimentoOrdemServicoController {
    constructor(
        @repository(RecebimentoOrdemServicoRepository)
        public recebimentoOrdemServicoRepository: RecebimentoOrdemServicoRepository,
        @repository(EntregavelRecebimentoOrdemServicoRepository)
        public entregavelRecebimentoOrdemServicoRepository: EntregavelRecebimentoOrdemServicoRepository,
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
