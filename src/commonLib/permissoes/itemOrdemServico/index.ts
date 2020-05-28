import {IItemOrdemServico, IOrdemServico, ITipoOrdemServicoContrato} from '../../interface-models';
import {ConstrutorRetornoPermissoesFactory} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';
import {editarDescricao} from './editarDescricao';
import {editarPlanejamento} from './editarPlanejamento';
import {editarRealizado} from './editarRealizado';
import {remover} from './remover';
import {salvar} from './salvar';

/**
 * Retorna objeto com um função para cada ação possível para um Item de Ordem de Serviço
 * Essas funções avaliam se, de acordo com o status da {itemOrdemServico}, a ação está habilitada
 * e retorna um objeto com as propriedades 'ok' e um 'mensagensAtributo', que acumula
 * mensagens de retorno agrupadas pelo nome do atributo, 'ok' = TRUE indica se está habilitada a função.
 *
 * @param item  Etapa de Ordem de serviço analisada
 * @param ordemServico  Ordem de serviço analisada
 * @param tipoUso Indica o tipo de uso para o qual se está obtendo as permissões. Se VALIDAR_SERVIDOR, lança exceção
 * na primeira não conformidade; se VALIDAR_UI, faz todas as validações e retorna todas as mensagens de inconformidade;
 * se HABILITAR_UI, retorna {'ok': false} na primeira inconformidade
 */
export function getAcoeItemOrdemServico(
    tipoUso: TipoUsoPermissoes,
    item: IItemOrdemServico,
    ordemServico?: IOrdemServico,
    tipoOrdemServico?: ITipoOrdemServicoContrato,
) {
    const c = ConstrutorRetornoPermissoesFactory(tipoUso);
    return {
        editarDescricao: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'editarDescricao'`,
                );
            return editarDescricao(c, item, ordemServico);
        },
        editarPlanejamento: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'editarPlanejamento'`,
                );
            return editarPlanejamento(c, item, ordemServico);
        },
        editarRealizado: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'editarRealizado'`,
                );
            return editarRealizado(c, item, ordemServico);
        },
        remover: (): RetornoPermisao => {
            if (!ordemServico)
                throw new Error(`Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'remover'`);
            return remover(c, item, ordemServico);
        },
        salvar: (): RetornoPermisao => {
            if (!ordemServico)
                throw new Error(`Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'salvar'`);
            return salvar(c, item, ordemServico);
        },
    };
}
