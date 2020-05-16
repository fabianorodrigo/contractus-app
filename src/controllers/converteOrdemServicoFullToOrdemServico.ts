import {OrdemServico, OrdemServicoFull} from '../models';

/**
 * Recebe uma Ordem de Serviço FULL (com propriedades relacionadas a relações) e
 * executa validações dos dados contidos na {os} de acordo com o propósito.
 *
 * @param osFull Identificador da Ordem de serviço a ser validada (PK)

 */
export function converteOrdemServicoFullToOrdemServico(ordemServicoFull: OrdemServicoFull): OrdemServico {
    const ordemServico: OrdemServico = JSON.parse(JSON.stringify(ordemServicoFull)); //clone OS
    //remove atributos de relações pois o repository não aceita
    delete ordemServico.itens;
    delete ordemServico.entregaveis;
    delete ordemServico.etapas;
    delete ordemServico.indicadores;
    return ordemServico;
}
