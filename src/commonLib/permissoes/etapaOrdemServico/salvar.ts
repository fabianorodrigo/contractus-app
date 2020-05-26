import {getStatusOrdemServico, IEtapaOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {validaDataInicioMenorIgualDataFim} from '../../validaDataInicioDataFim';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function salvar(
    c: ConstrutorRetornoPermissoes,
    etapa: IEtapaOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ################################# DESCRIÇÃO DEVE ESTAR PREENCHIDA ##############################################*/
    let r = c.construir(
        tem(etapa.descricao) && etapa.descricao.trim() != '',
        'descricao',
        'Uma descrição da etapa de execução dos serviços deve ser informada',
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    if (getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO) {
        /* ################################# DATA INICIO PLANEJADA DEVE SER PREENCHIDA ##################################*/
        r = c.construir(
            tem(etapa.dtInicioPlanejada),
            'dtInicioPlanejada',
            'A data planejada para início da etapa deve ser informada',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

        /* ################################# DATA FIM PLANEJADA DEVE SER PREENCHIDA ######################################*/
        r = c.construir(
            tem(etapa.dtFimPlanejada),
            'dtFimPlanejada',
            'A data prevista para conclusão da etapa deve ser informada',
            r,
        );
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

        /* ###################### DATA FIM PLANEJADA DEVE SER MAIOR OU IGUAL QUE DATA INÍCIO PLANEJADA ##########################*/
        if (tem(etapa.dtInicioPlanejada) && tem(etapa.dtFimPlanejada)) {
            const periodoValido = validaDataInicioMenorIgualDataFim(
                etapa.dtInicioPlanejada as string,
                etapa.dtFimPlanejada as string,
            );
            if (tem(periodoValido)) {
                r = c.construir(
                    periodoValido as boolean,
                    'dtFimPlanejada',
                    'A data prevista para conclusão da etapa dever ser posterior à data de início',
                    r,
                );
            }
        }
    } else {
        /* ################################# DATA INICIO DEVE SER PREENCHIDA ##################################*/
        r = c.construir(tem(etapa.dtInicioReal), 'dtInicioReal', 'A data de início da etapa deve ser informada', r);
        //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
        if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

        /* ###################### DATA FIM PLANEJADA DEVE SER MAIOR OU IGUAL QUE DATA INÍCIO PLANEJADA ##########################*/
        if (tem(etapa.dtInicioReal) && tem(etapa.dtFimReal)) {
            const periodoValido = validaDataInicioMenorIgualDataFim(
                etapa.dtInicioReal as string,
                etapa.dtFimReal as string,
            );
            if (tem(periodoValido)) {
                r = c.construir(
                    periodoValido as boolean,
                    'dtFimPlanejada',
                    'A data prevista para conclusão da etapa dever ser posterior à data de início',
                    r,
                );
                //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
                if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;
            }
            /* ################################# SE JÁ INFORMOU A DATA DE CONCLUSÃO, O RESULTADO DA ETAPA DEVE SER INFORMADO ##################################*/
            r = c.construir(
                tem(etapa.idResultadoEtapa),
                'idResultadoEtapa',
                'O resultado da etapa deve ser informado',
                r,
            );
        }
    }
    return r;
}
