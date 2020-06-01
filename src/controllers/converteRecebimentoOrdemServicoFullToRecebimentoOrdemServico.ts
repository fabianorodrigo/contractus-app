import {RecebimentoOrdemServico} from '../models';
import {RecebimentoOrdemServicoFull} from '../models/recebimento-ordem-servico-full.model';

/**
 * Recebe um Recebimento de Ordem de Serviço FULL (com propriedades relacionadas a relações),
 * clona-o, remove propriedades navegacionais e retorna
 *
 * @param recebimentoFull objeto a ser convertido

 */
export function converteRecebimentoOrdemServicoFullToRecebimentoOrdemServico(
    recebimentoFull: RecebimentoOrdemServicoFull,
): RecebimentoOrdemServico {
    const recebimento: RecebimentoOrdemServico = JSON.parse(JSON.stringify(recebimentoFull)); //clone
    //remove atributos de relações pois o repository não aceita
    delete recebimento.entregaveis;
    return recebimento;
}
