import {
    IAreaRequisitante,
    IContrato,
    IEtapaOrdemServico,
    IFornecedor,
    IOrdemServico,
    IRecebimentoOrdemServico,
    IUsuario,
} from '../../commonLib/interface-models';
import {Credentials} from '../../commonLib/interface-models/';
import {del, get, login, post, postAcao, RespostaServico} from './restService';

export function autentica(token: string | undefined, credentials: Credentials): Promise<RespostaServico<IUsuario>> {
    //Remove os nulos
    const credentialsToPost = removerAtributosNulos<Credentials>(credentials);
    return login<IUsuario>(`/usuario/login/`, credentialsToPost);
}

export function getFornecedores(token: string | undefined): Promise<RespostaServico<IFornecedor[]>> {
    return get(token, '/fornecedor');
}

export function getAreasRequisitantes(token: string | undefined): Promise<RespostaServico<IAreaRequisitante[]>> {
    return get(token, '/areaRequisitante');
}

export function getContratos(token: string | undefined): Promise<RespostaServico<IContrato[]>> {
    return get(
        token,
        `/contrato?filter={ "order": ["dtInicioVigencia DESC"
  ],
  "include": [
    { "relation": "metricas","scope": {"order": ["sigla"]}},
    { "relation": "tiposOrdemServico","scope": {"order": ["descricao"],"include":[{"relation":"entregaveis"},{"relation":"etapas"}]}},
    { "relation": "papeis","scope": {"order": ["nome"]}}

  ]
}`,
    );
}

export function getOrdensServico(
    token: string | undefined,
    idContrato: number,
): Promise<RespostaServico<IOrdemServico[]>> {
    return get(
        token,
        `/contratoes/${idContrato}/ordem-servicos?filter={
        "order": ["numero DESC"]
      }`,
    ); //ordena pelo número da ordem de serviço descrescente. OS's mais recentes vem no topo. NÃO ADIANTA POIS GUARDA NO MAP INDEXADO POR ID
}

export function getOrdemServico(token: string | undefined, id: number): Promise<RespostaServico<IOrdemServico>> {
    return get(
        token,
        `/ordem-servico/${id}?filter={ "include": [
    { "relation": "itens"},{ "relation": "etapas"},{ "relation": "entregaveis"}]}`,
    );
}

export function postOrdemServico(
    token: string | undefined,
    ordemServico: IOrdemServico,
): Promise<RespostaServico<IOrdemServico>> {
    //Remove os nulos e as entidades relacionadas para poder enviar ao servidor (sem isso, rola exceção do backend)
    const ordemToPost = removerAtributosNulos<IOrdemServico>(ordemServico);
    return post<IOrdemServico>(token, `/ordem-servico/`, ordemToPost, ordemToPost.id);
}

export function deleteOrdemServico(token: string | undefined, id: number): Promise<RespostaServico<void>> {
    return del(token, `/ordem-servico/${id}`);
}

export function emitirOrdemServicoSEI(
    token: string | undefined,
    ordemServico: IOrdemServico,
): Promise<RespostaServico<IOrdemServico>> {
    return postAcao<IOrdemServico>(token, `/ordem-servico/emitirSEI/${ordemServico.id}`, null);
}

export function emitirTermoAceitacaoEtapaSEI(
    token: string | undefined,
    etapa: IEtapaOrdemServico,
): Promise<RespostaServico<IEtapaOrdemServico>> {
    if (typeof etapa.valorAdiantamentoPlanejado == 'string')
        etapa.valorAdiantamentoPlanejado = parseFloat(etapa.valorAdiantamentoPlanejado);
    if (typeof etapa.valorAdiantamentoReal == 'string')
        etapa.valorAdiantamentoReal = parseFloat(etapa.valorAdiantamentoReal);
    return postAcao<IEtapaOrdemServico>(
        token,
        `/etapa-ordem-servico/emitirTermoAceite/${etapa.id}`,
        removerAtributosNulos(etapa),
    );
}

export function emitirTermoRecebimentoSEI(
    token: string | undefined,
    recebimento: IRecebimentoOrdemServico,
): Promise<RespostaServico<IRecebimentoOrdemServico>> {
    const recebimentoToPost = removerAtributosNulos<IRecebimentoOrdemServico>(recebimento);
    return post<IRecebimentoOrdemServico>(
        token,
        `/recebimento-ordem-servico/`,
        recebimentoToPost,
        recebimentoToPost.id,
    );
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
