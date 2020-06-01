import {
    getStatusOrdemServico,
    IOrdemServico,
    IRecebimentoOrdemServico,
    StatusOrdemServico,
} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function salvar(
    c: ConstrutorRetornoPermissoes,
    recebimento: IRecebimentoOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
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
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### A DATA DE RECEBIMENTO TEM QUE SER NO MÁXIMO O PRÓPRIO DIA   ##########################*/
    r = c.construir(
        tem(recebimento.dtRecebimento) && new Date(recebimento.dtRecebimento).getTime() <= new Date().getTime(),
        '',
        `A data do recebimento da Ordem de Serviço não pode ser uma data futura`,
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### O TIPO DO RECEBIMENTO DEVE SER INFORMADO  ##########################*/
    r = c.construir(
        tem(recebimento.tipoRecebimento) && recebimento.tipoRecebimento.trim() != '',
        '',
        `O tipo de recebimento deve ser informado`,
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### TEM QUE EXISTIR ENTREGÁVEIS  ##########################*/
    r = c.construir(
        tem(recebimento.entregaveis) && recebimento.entregaveis.length > 0,
        '',
        `O Recebimento da Ordem de Serviço deve especificar os entregáveis recebidos`,
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    if (tem(recebimento.entregaveis) && recebimento.entregaveis.length > 0) {
        /* #################### OS ENTREGÁVEIS TEM QUE POSSUIR DESCRICAO E LINK PARA EVIDÊNCIAS ##########################*/
        r = c.construir(
            recebimento.entregaveis.every(
                (e) =>
                    tem(e.descricao) &&
                    tem(e.linkEvidencia) &&
                    e.descricao.trim() != '' &&
                    e.linkEvidencia.trim() != '',
            ),
            '',
            `O Recebimento da Ordem de Serviço deve descrever os entregáveis recebidos e os links das evidências`,
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;
    }

    return r;
}
