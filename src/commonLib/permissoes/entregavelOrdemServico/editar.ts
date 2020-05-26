import {IEntregavelOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {getStatusOrdemServico} from '../../interface-models/getStatusOrdemServico';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function editar(
    c: ConstrutorRetornoPermissoes,
    entregavel: IEntregavelOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ############### OU A ORDEM DE SERVIÇO AINDA ESTÁ EM RASCUNHO OU É UM ENTREGÁVEL NÃO PREVISTO NA EMISSÃO DA OS ######*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO || !tem(entregavel.id), //TODO: pensar sobre atributo que indica inclusão na OS na hora da emissão. Deste jeito, vai impedir edição
        'descricao',
        `Descrição do Entregável não pode ser modificada após emissão da Ordem de Serviço`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
