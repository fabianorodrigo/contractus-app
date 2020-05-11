import {OrdemServicoFull} from '../models';

/**
 * Retorna um objeto OrdemServico sem as propriedades que se referem a relações com outras entidades
 * Isso se faz necessário pois ao executar uma atualização, o Loopback gera uma exceção caso existam
 * propriedades 'navegacionais'
 *
 * @param ordemServico Ordem de Serviço original
 */
export function getOrdemServicoSemRelacoes(ordemServico: OrdemServicoFull) {
    const clone = JSON.parse(JSON.stringify(ordemServico));
    delete clone.itens;
    delete clone.entregaveis;
    delete clone.indicadores;
    delete clone.etapas;
    return clone;
}
