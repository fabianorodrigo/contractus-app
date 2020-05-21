import moment from 'moment';
import {IEtapaOrdemServico, IOrdemServico} from '../../../../commonLib/interface-models';
import {getProximoDiaUtil, LocalFeriado} from '../../../services/dataHora';

export function novaEtapaOrdemServico(ordemServico: IOrdemServico, numeroDiasUteisDuracao: number) {
    let dataInicio = moment();
    let dataFim = null;
    if (ordemServico.etapas && ordemServico.etapas.length > 0) {
        dataInicio = moment(
            (ordemServico.etapas[ordemServico.etapas.length - 1] as IEtapaOrdemServico).dtFimPlanejada,
        ).add(1, 'd');
    }
    dataInicio = getProximoDiaUtil(dataInicio, LocalFeriado.RioDeJaneiro);
    dataFim = getProximoDiaUtil(dataInicio, LocalFeriado.RioDeJaneiro);
    //se for um dia de duração, a data fim é a mesma
    //por isso, começamos a interação no 1 e não no zero
    for (let i = 1; i < numeroDiasUteisDuracao; i++) {
        dataFim.add(1, 'd');
        dataFim = getProximoDiaUtil(dataFim, LocalFeriado.RioDeJaneiro);
    }
    return {
        idOrdemServico: ordemServico.id,
        descricao: '',
        dtInicioPlanejada: dataInicio.toDate().toISOString(), //TODO: Ver como se comporta o componente datepicker. Estávamos retornando Date
        dtFimPlanejada: dataFim.toDate().toISOString(),
        valorAdiantamentoPlanejado: 0,
    };
}
