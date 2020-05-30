import {IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {getStatusOrdemServico} from '../../interface-models/getStatusOrdemServico';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function editar(c: ConstrutorRetornoPermissoes, ordemServico: IOrdemServico): RetornoPermisao {
    /* ############### A ORDEM DE SERVIÇO DEVE ESTAR EM RASCUNHO PARA SER EDITADA ######*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO,
        '',
        `A Ordem de Serviço não pode ser modificada após emissão no SEI`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
