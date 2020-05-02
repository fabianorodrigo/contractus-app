import {Contrato, Fornecedor, OrdemServico, OrdemServicoFull} from '../../models';
import {del, get, post, RespostaServico} from './restService';

export function getFornecedores(): Promise<RespostaServico<Fornecedor[]>> {
    return get('/fornecedor');
}

export function getContratos(): Promise<RespostaServico<Contrato[]>> {
    return get(`/contrato?filter={ "order": ["dtInicioVigencia DESC"
  ],
  "include": [
    { "relation": "metricas","scope": {"order": ["sigla"]}},
    { "relation": "tiposOrdemServico","scope": {"order": ["descricao"],"include":[{"relation":"entregaveis"}]}},
    { "relation": "papeis","scope": {"order": ["nome"]}}

  ]
}`);
}

export function getOrdensServico(idContrato: number): Promise<RespostaServico<OrdemServico[]>> {
    return get(`/contratoes/${idContrato}/ordem-servicos`);
}

export function getOrdemServico(id: number): Promise<RespostaServico<OrdemServicoFull>> {
    return get(`/ordem-servico/${id}?filter={ "include": [
    { "relation": "itens"},{ "relation": "etapas"},{ "relation": "entregaveis"}]}`);
}

export function postOrdemServico(ordemServico: OrdemServicoFull): Promise<RespostaServico<OrdemServicoFull>> {
    //Remove os nulos e as entidades relacionadas para poder enviar ao servidor (sem isso, rola exceção do backend)
    const ordemToPost = removerAtributosNulos(ordemServico);
    return post(`/ordem-servico/`, ordemToPost as OrdemServicoFull, ordemToPost.id);
}

export function deleteOrdemServico(id: number): Promise<RespostaServico<void>> {
    return del(`/ordem-servico/${id}`);
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
