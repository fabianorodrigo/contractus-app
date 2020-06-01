import {
    IAreaRequisitante,
    IContrato,
    IEtapaOrdemServico,
    IFornecedor,
    IOrdemServico,
    IRecebimentoOrdemServico,
} from '../../commonLib/interface-models';
import {del, get, post, postAcao, RespostaServico} from './restService';

export function getFornecedores(): Promise<RespostaServico<IFornecedor[]>> {
    return get('/fornecedor');
}

export function getAreasRequisitantes(): Promise<RespostaServico<IAreaRequisitante[]>> {
    return get('/areaRequisitante');
}

export function getContratos(): Promise<RespostaServico<IContrato[]>> {
    return get(`/contrato?filter={ "order": ["dtInicioVigencia DESC"
  ],
  "include": [
    { "relation": "metricas","scope": {"order": ["sigla"]}},
    { "relation": "tiposOrdemServico","scope": {"order": ["descricao"],"include":[{"relation":"entregaveis"},{"relation":"etapas"}]}},
    { "relation": "papeis","scope": {"order": ["nome"]}}

  ]
}`);
}

export function getOrdensServico(idContrato: number): Promise<RespostaServico<IOrdemServico[]>> {
    return get(`/contratoes/${idContrato}/ordem-servicos?filter={
        "order": ["numero DESC"]
      }`); //ordena pelo número da ordem de serviço descrescente. OS's mais recentes vem no topo. NÃO ADIANTA POIS GUARDA NO MAP INDEXADO POR ID
}

export function getOrdemServico(id: number): Promise<RespostaServico<IOrdemServico>> {
    return get(`/ordem-servico/${id}?filter={ "include": [
    { "relation": "itens"},{ "relation": "etapas"},{ "relation": "entregaveis"}]}`);
}

export function postOrdemServico(ordemServico: IOrdemServico): Promise<RespostaServico<IOrdemServico>> {
    //Remove os nulos e as entidades relacionadas para poder enviar ao servidor (sem isso, rola exceção do backend)
    const ordemToPost = removerAtributosNulos<IOrdemServico>(ordemServico);
    return post<IOrdemServico>(`/ordem-servico/`, ordemToPost, ordemToPost.id);
}

export function deleteOrdemServico(id: number): Promise<RespostaServico<void>> {
    return del(`/ordem-servico/${id}`);
}

export function emitirOrdemServicoSEI(ordemServico: IOrdemServico): Promise<RespostaServico<IOrdemServico>> {
    console.log('ordemServico.id', ordemServico);
    return postAcao<IOrdemServico>(`/ordem-servico/emitirSEI/${ordemServico.id}`, null);
}

export function emitirTermoAceitacaoEtapaSEI(etapa: IEtapaOrdemServico): Promise<RespostaServico<IEtapaOrdemServico>> {
    if (typeof etapa.valorAdiantamentoPlanejado == 'string')
        etapa.valorAdiantamentoPlanejado = parseFloat(etapa.valorAdiantamentoPlanejado);
    if (typeof etapa.valorAdiantamentoReal == 'string')
        etapa.valorAdiantamentoReal = parseFloat(etapa.valorAdiantamentoReal);
    return postAcao<IEtapaOrdemServico>(
        `/etapa-ordem-servico/emitirTermoAceite/${etapa.id}`,
        removerAtributosNulos(etapa),
    );
}

export function emitirTermoRecebimentoSEI(
    recebimento: IRecebimentoOrdemServico,
): Promise<RespostaServico<IRecebimentoOrdemServico>> {
    const recebimentoToPost = removerAtributosNulos<IRecebimentoOrdemServico>(recebimento);
    return post<IRecebimentoOrdemServico>(`/recebimento-ordem-servico/`, recebimentoToPost, recebimentoToPost.id);
}

function removerAtributosNulos<T>(obj: {[atributo: string]: any}): T {
    const retorno: {[atributo: string]: any} = {};
    Object.keys(obj).forEach((k) => {
        if (obj[k] != null) {
            retorno[k] = obj[k];
        }
    });
    return retorno as T;
}
