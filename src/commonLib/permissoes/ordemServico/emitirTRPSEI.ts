import {getStatusOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function emitirTRPSEI(c: ConstrutorRetornoPermissoes, ordemServico: IOrdemServico): RetornoPermisao {
    /* #################### ORDEM DE SERVIÇO DEVE TER SIDO EMITIDA #########################*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) > StatusOrdemServico.RASCUNHO,
        '',
        `Ordem de Serviço já deve ter sido emitida no SEI`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ORDEM DE SERVIÇO NÁO PODE TER SIDO CANCELADA ##########################*/
    r = c.construir(
        !tem(ordemServico.dtCancelamento),
        '',
        `A Ordem de Serviço consta como cancelada. Não é possível emiti-la no SEI`,
        r,
    );
    return r;
}
