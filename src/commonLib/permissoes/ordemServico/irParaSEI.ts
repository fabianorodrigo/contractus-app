import {IOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';

export function irParaSEI(c: ConstrutorRetornoPermissoes, ordemServico: IOrdemServico): RetornoPermisao {
    /* ############################# ORDEM DE SERVIÇO JÁ TEM QUE TER SIDO EMITIDA #####################################*/
    let r = c.construir(tem(ordemServico.linkOrdemServicoSEI), '', `Ordem de Serviço ainda não foi emitida no SEI`);
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    //if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
