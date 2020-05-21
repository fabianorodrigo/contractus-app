import {IEtapaOrdemServico} from '../../../../commonLib/interface-models';
import {validaDataInicioMenorIgualDataFim} from '../../../../commonLib/validaDataInicioDataFim';

type TypeValidaEtapa = {
    descricao: string;
    dtInicioPlanejada: string;
    dtFimPlanejada: string;
    dtInicioReal: string;
    dtFimReal: string;
    valorAdiantamentoPlanejado: string;
    valorAdiantamentoReal: string;
};

/**
 * Avalia os valorees dos atributos da {etapa} e retorna mensagem de erro para
 * cada inconsistência.
 *
 * @param etapa Etapa a ser validada
 */
export const valida = (etapa: IEtapaOrdemServico): TypeValidaEtapa => {
    let errosInput: TypeValidaEtapa = {} as TypeValidaEtapa;
    errosInput.descricao =
        etapa.descricao == null || etapa.descricao.trim() == ''
            ? 'Uma descrição da etapa de execução dos serviços deve ser informada'
            : '';
    //FIXME: Utilizar a commonLib/permissoes/
    //planejamento
    errosInput.dtInicioPlanejada =
        etapa.dtInicioPlanejada == null ? 'A data planejada para início da etapa deve ser informada' : '';
    errosInput.dtFimPlanejada =
        etapa.dtFimPlanejada == null ? 'A data prevista para conclusão da etapa deve ser informada' : '';
    errosInput.dtFimPlanejada =
        etapa.dtInicioPlanejada != null &&
        etapa.dtFimPlanejada != null &&
        !validaDataInicioMenorIgualDataFim(etapa.dtInicioPlanejada, etapa.dtFimPlanejada)
            ? 'A data prevista para conclusão da etapa dever ser posterior à data de início'
            : '';

    //realizado
    if (etapa.dtInicioReal != null || etapa.dtFimReal != null) {
        errosInput.dtInicioReal = etapa.dtInicioReal == null ? 'A data de início da etapa deve ser informado' : '';
        errosInput.dtFimReal =
            etapa.dtInicioReal != null &&
            etapa.dtFimReal != null &&
            !validaDataInicioMenorIgualDataFim(etapa.dtInicioReal, etapa.dtFimReal)
                ? 'A data de conclusão da etapa dever ser posterior à data de início'
                : '';
    }

    return errosInput;
};
