import {IOrdemServico, IRecebimentoOrdemServico, ITipoOrdemServicoContrato} from '../../interface-models';
import {ConstrutorRetornoPermissoesFactory} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';
import {salvar} from './salvar';

/**
 * Retorna objeto com um função para cada ação possível para um Recebimento de Ordem de Serviço
 * Essas funções avaliam se, de acordo com o status da {recebimentoOrdemServico}, a ação está habilitada
 * e retorna um objeto com as propriedades 'ok' e um 'mensagensAtributo', que acumula
 * mensagens de retorno agrupadas pelo nome do atributo, 'ok' = TRUE indica se está habilitada a função.
 *
 * @param recebimento  Entregavel de Ordem de serviço analisado
 * @param ordemServico  Ordem de serviço analisada
 * @param tipoUso Indica o tipo de uso para o qual se está obtendo as permissões. Se VALIDAR_SERVIDOR, lança exceção
 * na primeira não conformidade; se VALIDAR_UI, faz todas as validações e retorna todas as mensagens de inconformidade;
 * se HABILITAR_UI, retorna {'ok': false} na primeira inconformidade
 */
export function getAcoesRecebimentoOrdemServico(
    tipoUso: TipoUsoPermissoes,
    recebimento: IRecebimentoOrdemServico,
    ordemServico?: IOrdemServico,
    tipoOrdemServico?: ITipoOrdemServicoContrato,
) {
    const c = ConstrutorRetornoPermissoesFactory(tipoUso);
    return {
        salvar: (): RetornoPermisao => {
            if (!ordemServico)
                throw new Error(`Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'salvar'`);
            return salvar(c, recebimento, ordemServico);
        },
    };
}
