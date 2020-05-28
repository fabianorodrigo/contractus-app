import {getStatusOrdemServico, IItemOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function remover(
    c: ConstrutorRetornoPermissoes,
    item: IItemOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* #################### ORDEM DE SERVIÇO DEVE ESTAR EM RASCUNHO OU O ITEM NÃO FOI PREVISTO NO PLANEJAMENTO #########################*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO ||
            (!tem(item.quantidadeEstimada) && !tem(item.valorUnitarioEstimado)),
        '',
        `A Ordem de Serviço já foi emitida e este item foi previsto no planejamento`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
