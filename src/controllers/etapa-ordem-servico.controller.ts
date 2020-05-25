import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {getAcoesEtapaOrdemServico, tem, TipoUsoPermissoes} from '../commonLib';
import {ValidationError} from '../commonLib/ValidationError';
import {EtapaOrdemServico} from '../models';
import {
    AreaRequisitanteRepository,
    ContratoRepository,
    EtapaOrdemServicoRepository,
    FornecedorRepository,
    OrdemServicoRepository,
} from '../repositories';
import {
    criarDocumento,
    criarIncluirDocumentoRequest,
    Documento,
    SeiService,
    SeiServiceProvider,
    TIPO_DOCUMENTO_TERMO_ACEITACAO,
} from '../services';
import {tratarIncluirDocumentoResponse} from '../services/tratarIncluirDocumentoResponse';
import {getHTMLTermoAceitacaoSEI} from './getHTMLTermoAceitacaoSEI';
import {getValidaContrato} from './getValidaContrato';

export class EtapaOrdemServicoController {
    constructor(
        @repository(EtapaOrdemServicoRepository)
        public etapaOrdemServicoRepository: EtapaOrdemServicoRepository,
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

    @post('/etapa-ordem-servico/emitirTermoAceite/{id}', {
        responses: {
            '200': {
                description: 'OrdemServico model instance',
                content: {'application/json': {schema: getModelSchemaRef(EtapaOrdemServico)}},
            },
        },
    })
    async incluirTermoAceitacaoSEI(
        @param.path.number('id') id: number,
        @requestBody() etapaOrdemServico: EtapaOrdemServico,
    ): Promise<EtapaOrdemServico> {
        //busca a etapa de ordem de serviço
        const etapa = await this.etapaOrdemServicoRepository.findById(id);
        //busca a ordem de serviço com todas as suas relações
        const ordemServico = await this.ordemServicoRepository.findById(etapa.idOrdemServico);
        const contrato = await getValidaContrato(this.contratoRepository, ordemServico.idContrato);
        const tipoOS = contrato.tiposOrdemServico.find((tos) => tos.id == ordemServico.idTipoOrdemServicoContrato);
        if (!tipoOS) throw new ValidationError(422, `Tipo de Ordem de Serviço não encontrado no Contrato`);
        if (!tipoOS.termoAceitacaoEmitidoPorEtapa)
            throw new ValidationError(
                422,
                `Tipo de Ordem de Serviço não está configurado para emitir Termo de Aceitação por etapa`,
            );
        //objeto validador das ações habilitadas com a opção de lançar exceção em caso de impossibilidade
        const permissoesEtapa = getAcoesEtapaOrdemServico(
            TipoUsoPermissoes.VALIDAR_SERVIDOR,
            etapa,
            ordemServico,
            tipoOS,
        );
        permissoesEtapa.emitirTermoAceitacaoSEI();
        //Esse caso pode acontecer quando o usuário editou as datas de início e fim reais na interface
        //mas ainda não salvou a OS. Neste caso, usaremos a data não persistida ainda e persistiremos
        //no ato de emissão do Termo de Aceitação
        if (etapa.dtInicioReal == null || etapa.dtFimReal == null) {
            if (etapaOrdemServico.dtInicioReal == null || etapaOrdemServico.dtFimReal == null) {
                throw new ValidationError(422, `A Etapa não possui datas de início e/ou conclusão realizadas`);
            } else {
                etapa.dtInicioReal = etapaOrdemServico.dtInicioReal;
                etapa.dtFimReal = etapaOrdemServico.dtFimReal;
                if (tem(etapaOrdemServico.valorAdiantamentoReal))
                    etapa.valorAdiantamentoReal = etapaOrdemServico.valorAdiantamentoReal;
                if (tem(etapaOrdemServico.idResultadoEtapa))
                    etapa.idResultadoEtapa = etapaOrdemServico.idResultadoEtapa;
            }
        }
        const areaRequisitante = await this.areaRequisitanteRepository.findById(ordemServico.idAreaRequisitante);
        const fornecedor = await this.fornecedorRepository.findById(contrato.idFornecedor);

        //Gera documento HTML a ser enviado para o SEI
        const htmlDocumento: string = getHTMLTermoAceitacaoSEI(
            etapa,
            ordemServico,
            contrato,
            tipoOS,
            fornecedor,
            areaRequisitante,
        );

        const doc: Documento = criarDocumento(
            areaRequisitante.numeroProcessoOrdensServicoSEI,
            TIPO_DOCUMENTO_TERMO_ACEITACAO,
            `${etapa.descricao.replace(/Sprint/i, '')} - OS-${String(ordemServico.numero).padStart(3, '0')}`,
            `Termo de Aceitação: OS ${String(ordemServico.numero).padStart(3, '0')} ${etapa.descricao} - Contrato ${
                contrato.numeroContrato
            }/${contrato.anoContrato}`,
            Buffer.from(htmlDocumento).toString('base64'),
        );
        let documentoSEI = null;

        documentoSEI = tratarIncluirDocumentoResponse(
            await this.SEIService.incluirDocumento(criarIncluirDocumentoRequest(doc)),
        );
        etapa.numeroDocumentoTermoAceitacaoSEI = parseInt(documentoSEI.parametros.DocumentoFormatado);
        etapa.linkTermoAceitacaoSEI = documentoSEI.parametros.LinkAcesso;
        //para atualizar a ordem de serviço, precisa remover os atributos de relações com outras entidades
        await this.etapaOrdemServicoRepository.replaceById(etapa.id, etapa);
        return etapa;
    }
}
