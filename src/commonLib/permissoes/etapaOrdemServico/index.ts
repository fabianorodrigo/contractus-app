import {IEtapaOrdemServico, IOrdemServico, ITipoOrdemServicoContrato} from '../../interface-models';
import {ConstrutorRetornoPermissoesFactory} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';
import {editarDescricao} from './editarDescricao';
import {editarPlanejamento} from './editarPlanejamento';
import {editarRealizado} from './editarRealizado';
import {emitirTermoAceitacaoSEI} from './emitirTermoAceitacaoSEI';
import {irParaTermoAceitacaoSEI} from './irParaTermoAceitacaoSEI';
import {remover} from './remover';
import {salvar} from './salvar';

/**
 * Retorna objeto com um função para cada ação possível para uma Etapa de Ordem de Serviço
 * Essas funções avaliam se, de acordo com o status da {etapaOrdemServico}, a ação está habilitada
 * e retorna um objeto com as propriedades 'ok' e um 'mensagensAtributo', que acumula
 * mensagens de retorno agrupadas pelo nome do atributo, 'ok' = TRUE indica se está habilitada a função.
 *
 * @param etapa  Etapa de Ordem de serviço analisada
 * @param ordemServico  Ordem de serviço analisada
 * @param tipoUso Indica o tipo de uso para o qual se está obtendo as permissões. Se VALIDAR_SERVIDOR, lança exceção
 * na primeira não conformidade; se VALIDAR_UI, faz todas as validações e retorna todas as mensagens de inconformidade;
 * se HABILITAR_UI, retorna {'ok': false} na primeira inconformidade
 */
export function getAcoesEtapaOrdemServico(
    tipoUso: TipoUsoPermissoes,
    etapa: IEtapaOrdemServico,
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
            return editarDescricao(c, etapa, ordemServico);
        },
        editarPlanejamento: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'editarPlanejamento'`,
                );
            return editarPlanejamento(c, etapa, ordemServico);
        },
        editarRealizado: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'editarRealizado'`,
                );
            return editarRealizado(c, etapa, ordemServico);
        },
        emitirTermoAceitacaoSEI: () => {
            if (!ordemServico)
                throw new Error(
                    `Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'emitirTermoAceitacaoSEI'`,
                );
            if (!tipoOrdemServico)
                throw new Error(
                    `Parâmetro 'tipoOrdemServico' precisa ser informado para verificar permisão 'emitirTermoAceitacaoSEI'`,
                );
            return emitirTermoAceitacaoSEI(c, etapa, ordemServico, tipoOrdemServico);
        },
        irParaTermoAceitacaoSEI: () => {
            return irParaTermoAceitacaoSEI(c, etapa);
        },
        remover: (): RetornoPermisao => {
            if (!ordemServico)
                throw new Error(`Parâmetro 'ordemServico' precisa ser informado para verificar permisão 'remover'`);
            return remover(c, etapa, ordemServico);
        },
        salvar: (): RetornoPermisao => {
            return salvar(c, etapa);
        },
    };
}
