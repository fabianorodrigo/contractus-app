import {IEntregavelRecebimentoOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function salvar(
    c: ConstrutorRetornoPermissoes,
    entregavel: IEntregavelRecebimentoOrdemServico,
): RetornoPermisao {
    /* ################################# DESCRIÇÃO DEVE ESTAR PREENCHIDA ##############################################*/
    let r = c.construir(
        tem(entregavel.descricao) && entregavel.descricao.trim() != '',
        'descricao',
        'Uma descrição do entregável deve ser informada',
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ################################# LINK DE EVIDÊNCIA DEVE ESTAR PREENCHIDO ##############################################*/
    r = c.construir(
        tem(entregavel.linkEvidencia) && entregavel.linkEvidencia.trim() != '',
        'descricao',
        'Um link para a evidẽncia do entregável deve ser informado',
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
