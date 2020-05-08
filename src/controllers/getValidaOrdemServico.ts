import {getStatusOrdemServico} from '../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../models/StatusOrdemServico';
import {OrdemServicoRepository} from '../repositories';

export enum AcaoGetOrdemServico {
    Emissao_SEI,
}

/**
 * Busca a Ordem de Serviço com o {id} solicitado e
 * executa validações dos dados contidos na {os} de acordo com o propósito.
 *
 * @param id Identificador da Ordem de serviço a ser validada (PK)
 * @param proposito Pra qual fim a ordem de serviço está sendo buscada. Com base nesta
 * informação que as validações serão executadas
 */
export async function getValidaOrdemServico(
    ordemServicoRepository: OrdemServicoRepository,
    id: number,
    proposito: AcaoGetOrdemServico,
) {
    //busca a ordem de serviço com todas as suas relações necessárias ao propósito
    const include = [{relation: 'itens'}, {relation: 'etapas'}, {relation: 'entregaveis'}];
    const ordemServico = await ordemServicoRepository.findById(id, {
        include,
    });
    if (proposito == AcaoGetOrdemServico.Emissao_SEI) {
        const statusOS = getStatusOrdemServico(ordemServico);
        if (statusOS != StatusOrdemServico.RASCUNHO)
            throw new Error(
                `Ordem de Serviço com identificador ${ordemServico.id} com status inválido para emissão: ${statusOS}`,
            );

        if (!ordemServico.itens || ordemServico.itens.length == 0)
            throw new Error(
                `Ordem de Serviço com identificador ${ordemServico.id} está com a lista de itens de serviço vazia`,
            );
        if (!ordemServico.etapas || ordemServico.etapas.length == 0)
            throw new Error(
                `Ordem de Serviço com identificador ${ordemServico.id} está com a lista de etapas de execução vazia`,
            );
        if (!ordemServico.entregaveis || ordemServico.entregaveis.length == 0)
            throw new Error(
                `Ordem de Serviço com identificador ${ordemServico.id} está com a lista de entregáveis esperados vazia`,
            );
    }
    return ordemServico;
}
