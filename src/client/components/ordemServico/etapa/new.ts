import moment from 'moment';
import {EtapaOrdemServico, OrdemServicoFull} from '../../../../models';

export function novaEtapaOrdemServico(ordemServico: OrdemServicoFull) {
    let dataInicio = moment();
    if (ordemServico.etapas && ordemServico.etapas.length > 0) {
        dataInicio = moment(
            (ordemServico.etapas[ordemServico.etapas.length - 1] as EtapaOrdemServico).dtFimPlanejada,
        ).add(1, 'd');
    }
    return {
        idOrdemServico: ordemServico.id,
        descricao: '',
        dtInicioPlanejada: dataInicio.toDate(),
        dtFimPlanejada: dataInicio.add(11, 'd').toDate(),
    };
}
