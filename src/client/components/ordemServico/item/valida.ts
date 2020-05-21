import {IItemOrdemServico} from '../../../../commonLib/interface-models';
import {StatusOrdemServico} from '../../../../commonLib/interface-models/StatusOrdemServico';

type TypeValidaItem = {
    descricao: string;
    siglaMetrica: string;
    quantidadeEstimada: string;
    valorUnitarioEstimado: string;
    quantidadeReal: string;
    valorUnitarioReal: string;
};

/**
 * Avalia os valorees dos atributos da {etapa} e retorna mensagem de erro para
 * cada inconsistência.
 *
 * @param item Enregável  a ser validado
 */
export const valida = (item: IItemOrdemServico, statusOrdemServico: StatusOrdemServico): TypeValidaItem => {
    let errosInput: TypeValidaItem = {} as TypeValidaItem;

    errosInput.descricao =
        item.descricao == null || item.descricao.trim() == '' ? 'Uma descrição do serviço deve ser informada' : '';
    errosInput.siglaMetrica =
        item.siglaMetrica == null || item.siglaMetrica.trim() == '' ? 'A unidade do serviço deve ser informada' : '';

    //planejamento
    if (statusOrdemServico == StatusOrdemServico.RASCUNHO) {
        errosInput.quantidadeEstimada =
            item.quantidadeEstimada <= 0 ? 'O quantitavo do serviço deve ser informado' : '';
        errosInput.valorUnitarioEstimado =
            item.valorUnitarioEstimado <= 0 ? 'O valor unitário do serviço deve ser informado' : '';
    } else {
        //realizado
        errosInput.quantidadeReal =
            item.quantidadeReal == null ? 'O quantitativo do serviço realizado deve ser informado' : '';
        errosInput.valorUnitarioReal =
            item.valorUnitarioReal == null || item.valorUnitarioReal <= 0
                ? 'O valor unitário do serviço deve ser informado'
                : '';
    }
    return errosInput;
};
