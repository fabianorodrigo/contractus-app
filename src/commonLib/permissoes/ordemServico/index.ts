import {IOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoesFactory} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';
import {excluir} from './excluir';

/**
 * Retorna objeto com um função para cada ação possível para uma Ordem de Serviço
 * Essas funções avaliam se, de acordo com o status da {OrdemServico}, a ação está habilitada
 * e retorna um objeto com as propriedades 'ok' e um 'mensagensAtributo', que acumula
 * mensagens de retorno agrupadas pelo nome do atributo, 'ok' = TRUE indica se está habilitada a função.
 *
 * @param ordemServico  Ordem de serviço analisada
 * @param tipoUso Indica o tipo de uso para o qual se está obtendo as permissões. Se VALIDAR_SERVIDOR, lança exceção
 * na primeira não conformidade; se VALIDAR_UI, faz todas as validações e retorna todas as mensagens de inconformidade;
 * se HABILITAR_UI, retorna {'ok': false} na primeira inconformidade
 */
export function getAcoesOrdemServico(ordemServico: IOrdemServico, tipoUso: TipoUsoPermissoes) {
    const c = ConstrutorRetornoPermissoesFactory(tipoUso);
    return {
        excluir: (): RetornoPermisao => {
            return excluir(c, ordemServico);
        },
    };
}
