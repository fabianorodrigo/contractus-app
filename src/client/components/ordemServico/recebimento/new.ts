import {IOrdemServico, IRecebimentoOrdemServico} from '../../../../commonLib/interface-models';

export function novoRecebimentoOrdemServico(ordemServico: IOrdemServico): IRecebimentoOrdemServico {
    return {
        idOrdemServico: ordemServico.id as number,
        tipoRecebimento: '',
        dtRecebimento: new Date().toISOString(),
        entregaveis: ordemServico.entregaveis.map((e) => {
            return {
                descricao: e.descricao,
                ordem: e.ordem,
                idRecebimentoOrdemServico: -1,
                linkEvidencia: '',
            };
        }),
    };
}
