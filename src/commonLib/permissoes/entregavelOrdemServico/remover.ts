import {
    getStatusOrdemServico,
    IEntregavelOrdemServico,
    IOrdemServico,
    StatusOrdemServico,
} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';

export function remover(
    c: ConstrutorRetornoPermissoes,
    entregavel: IEntregavelOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* #################### ORDEM DE SERVIÇO DEVE ESTAR EM RASCUNHO OU O ENTREGÁVEL NÃO FOI PREVISTO NO PLANEJAMENTO #########################*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO || !tem(entregavel.id),
        '',
        `A Ordem de Serviço já foi emitida e este era um entregável previsto no planejamento`,
    );
    return r;
}
