import moment from 'moment';
import {EtapaOrdemServico, OrdemServicoFull} from '../../../../models';
import {getProximoDiaUtil, LocalFeriado} from '../../../services/dataHora';

export function novaEtapaOrdemServico(ordemServico: OrdemServicoFull, numeroDiasUteisDuracao: number) {
    let dataInicio = moment();
    let dataFim = null;
    if (ordemServico.etapas && ordemServico.etapas.length > 0) {
        dataInicio = moment(
            (ordemServico.etapas[ordemServico.etapas.length - 1] as EtapaOrdemServico).dtFimPlanejada,
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
        dtInicioPlanejada: dataInicio.toDate(),
        dtFimPlanejada: dataFim.toDate(),
    };
}
