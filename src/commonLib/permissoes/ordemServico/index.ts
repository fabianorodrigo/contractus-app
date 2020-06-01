import {IOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoesFactory} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';
import {adicionarEntregavel} from './adicionarEntregavel';
import {editar} from './editar';
import {emitirSEI} from './emitirSEI';
import {emitirTRPSEI} from './emitirTRPSEI';
import {excluir} from './excluir';
import {irParaSEI} from './irParaSEI';

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
export function getAcoesOrdemServico(tipoUso: TipoUsoPermissoes, ordemServico: IOrdemServico) {
    const c = ConstrutorRetornoPermissoesFactory(tipoUso);
    return {
        adicionarEntregavel: () => {
            return adicionarEntregavel(c, ordemServico);
        },
        editar: (): RetornoPermisao => {
            return editar(c, ordemServico);
        },
        emitirSEI: (): RetornoPermisao => {
            return emitirSEI(c, ordemServico);
        },
        emitirTRPSEI: (): RetornoPermisao => {
            return emitirTRPSEI(c, ordemServico);
        },
        excluir: (): RetornoPermisao => {
            return excluir(c, ordemServico);
        },
        irParaSEI: (): RetornoPermisao => {
            return irParaSEI(c, ordemServico);
        },
    };
}
