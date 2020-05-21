import {ISancaoIndicadorNiveisServicoContrato} from './sancao-indicador-niveis-servico-contrato.model';

export interface IIndicadorNiveisServicoContrato {
    id?: number;
    sigla: string;
    descricao: string;
    formula?: string;
    idTipoOrdemServicoContrato?: number;
    sancoes: ISancaoIndicadorNiveisServicoContrato[];
}
