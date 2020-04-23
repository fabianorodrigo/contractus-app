import {OrdemServicoFull} from '../../../models';

export const OrdemServicoNova = ({
    idContrato: -1,
    emergencial: false,
    idTipoOrdemServicoContrato: -1,
    nomeRequisitante: '',
    nomeFiscalTecnico: '',
    itens: [],
    entregaveis: [],
    etapas: [],
} as unknown) as OrdemServicoFull;
