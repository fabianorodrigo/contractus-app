import {IItemOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {getStatusOrdemServico} from '../../interface-models/getStatusOrdemServico';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function editarRealizado(
    c: ConstrutorRetornoPermissoes,
    item: IItemOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ############### ORDEM DE SERVIÇO JÁ DEVE TER SIDO EMITIDA ######*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) > StatusOrdemServico.RASCUNHO,
        'quantidadeReal',
        `Dados de realização do serviço só podem ser editados após emissão da Ordem de Serviço`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
