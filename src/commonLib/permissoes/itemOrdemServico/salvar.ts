import {getStatusOrdemServico, IItemOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function salvar(
    c: ConstrutorRetornoPermissoes,
    item: IItemOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ################################# DESCRIÇÃO DEVE ESTAR PREENCHIDA ##############################################*/
    let r = c.construir(
        tem(item.descricao) && item.descricao.trim() != '',
        'descricao',
        'Uma descrição do item de serviço deve ser informada',
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;
    /* ################################# UNIDADE DE MEDIDA DEVE SER PREENCHIDA ##################################*/
    r = c.construir(
        tem(item.siglaMetrica) && item.siglaMetrica.trim() != '',
        'siglaMetrica',
        'A unidade do serviço deve ser informada',
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    if (getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO) {
        /* ################################# QUANTIDADE ESTIMADA DEVE SER PREENCHIDA ######################################*/
        r = c.construir(
            tem(item.quantidadeEstimada) && item.quantidadeEstimada > 0,
            'quantidadeEstimada',
            'O quantitavo estimatdo para o serviço deve ser informado',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

        /* ################################# VALOR UNITÁRIO ESTIMADO DEVE SER PREENCHIDA ######################################*/
        r = c.construir(
            tem(item.valorUnitarioEstimado) && item.valorUnitarioEstimado > 0,
            'valorUnitarioEstimado',
            'O valor unitário do serviço deve ser informado',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;
    } else {
        /* ################################# QUANTIDADE REALIZADA DEVE SER PREENCHIDA ######################################*/
        r = c.construir(
            tem(item.quantidadeReal),
            'quantidadeReal',
            'O quantitavo estimatdo para o serviço deve ser informado',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

        /* ################################# VALOR UNITÁRIO REALIZADO DEVE SER PREENCHIDA ######################################*/
        r = c.construir(
            tem(item.valorUnitarioReal) && (item.valorUnitarioReal as number) > 0,
            'valorUnitarioReal',
            'O valor unitário do serviço deve ser informado',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;
    }
    return r;
}
