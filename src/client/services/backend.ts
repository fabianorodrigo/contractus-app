import {Contrato, Fornecedor, OrdemServico} from '../../models';
import {get} from './restService';

export function getFornecedores(): Promise<Fornecedor[]> {
    return get('/fornecedor');
}

export function getContratos(): Promise<Contrato[]> {
    return get('/contrato');
}

export function getOrdensServico(idContrato: number): Promise<OrdemServico[]> {
    return get(`/contratoes/${idContrato}/ordem-servicos`);
}
