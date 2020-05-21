import {IOrdemServico} from '../../../commonLib/interface-models';

export function novaOrdemServico(): IOrdemServico {
    return {
        idContrato: -1,
        emergencial: false,
        idTipoOrdemServicoContrato: -1,
        idAreaRequisitante: -1,
        nomeRequisitante: '',
        nomeFiscalTecnico: '',
        idProjeto: '',
        itens: [],
        entregaveis: [],
        etapas: [],
    };
}
