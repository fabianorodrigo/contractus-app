import {IEntregavelRecebimentoOrdemServico, IRecebimentoOrdemServico} from '../../../../../commonLib/interface-models';

export function novoEntregavelRecebimentoOrdemServico(
    recebimento: IRecebimentoOrdemServico,
): IEntregavelRecebimentoOrdemServico {
    return {
        id: undefined,
        idRecebimentoOrdemServico: <number>recebimento.id,
        descricao: '',
        linkEvidencia: '',
        ordem: recebimento.entregaveis ? recebimento.entregaveis.length : 0,
    };
}
