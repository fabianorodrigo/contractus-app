import {Contrato, Fornecedor, OrdemServico, OrdemServicoFull} from '../../models';
import {get, post} from './restService';

export function getFornecedores(): Promise<Fornecedor[]> {
    return get('/fornecedor');
}

export function getContratos(): Promise<Contrato[]> {
    return get(`/contrato?filter={ "order": ["dtInicioVigencia DESC"
  ],
  "include": [
    { "relation": "metricas","scope": {"order": ["sigla"]}},
    { "relation": "tiposOrdemServico","scope": {"order": ["descricao"]}},
    { "relation": "papeis","scope": {"order": ["nome"]}}

  ]
}`);
}

export function getOrdensServico(idContrato: number): Promise<OrdemServico[]> {
    return get(`/contratoes/${idContrato}/ordem-servicos`);
}

export function getOrdemServico(id: number): Promise<OrdemServico> {
    return get(`/ordem-servico/${id}?filter={ "include": [
    { "relation": "itens"}]}`);
}

export function postOrdemServico(ordemServico: OrdemServicoFull): Promise<OrdemServico> {
    //Remove os nulos e as entidades relacionadas para poder enviar ao servidor (sem isso, rola exceção do backend)
    const ordemToPost = removerAtributosNulos(ordemServico);
    return post(`/ordem-servico/`, ordemToPost, ordemToPost.id);
}

function removerAtributosNulos(obj: {[atributo: string]: any}) {
    const retorno: {[atributo: string]: any} = {};
    Object.keys(obj).forEach((k) => {
        if (obj[k] != null) {
            retorno[k] = obj[k];
        }
    });
    return retorno;
}
