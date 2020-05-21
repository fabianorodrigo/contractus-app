import {IEtapaOrdemServico} from '../../interface-models';
import {validaDataInicioMenorIgualDataFim} from '../../validaDataInicioDataFim';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function salvar(c: ConstrutorRetornoPermissoes, etapa: IEtapaOrdemServico): RetornoPermisao {
    /* ################################# DESCRIÇÃO NÃO PREENCHIDA ##############################################*/
    let r = c.construir(
        etapa.descricao == null || etapa.descricao.trim() == '',
        'descricao',
        'Uma descrição da etapa de execução dos serviços deve ser informada',
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ################################# DATA INICIO PLANEJADA NÃO PREENCHIDA ##################################*/
    r = c.construir(
        etapa.dtInicioPlanejada == null,
        'dtInicioPlanejada',
        'A data planejada para início da etapa deve ser informada',
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ################################# DATA FIM PLANEJADA NÃO PREENCHIDA ######################################*/
    r = c.construir(
        etapa.dtFimPlanejada == null,
        'dtFimPlanejada',
        'A data prevista para conclusão da etapa deve ser informada',
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ###################### DATA FIM PLANEJADA MENOR QUE DATA INÍCIO PLANEJADA ##########################*/
    if (etapa.dtInicioPlanejada != null && etapa.dtFimPlanejada != null) {
        r = c.construir(
            validaDataInicioMenorIgualDataFim(etapa.dtInicioPlanejada, etapa.dtFimPlanejada),
            'dtFimPlanejada',
            'A data prevista para conclusão da etapa dever ser posterior à data de início',
            r,
        );
    }
    return r;
}
