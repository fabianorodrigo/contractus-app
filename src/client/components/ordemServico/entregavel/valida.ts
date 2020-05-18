import {EntregavelOrdemServico} from '../../../../models';

type TypeValidaEntregavel = {
    descricao: string;
    dtInicioPlanejada: string;
    dtFimPlanejada: string;
    dtInicioReal: string;
    dtFimReal: string;
    valorAdiantamentoPlanejado: string;
    valorAdiantamentoReal: string;
};

/**
 * Avalia os valorees dos atributos da {etapa} e retorna mensagem de erro para
 * cada inconsistência.
 *
 * @param entregavel Enregável  a ser validado
 */
export const valida = (entregavel: EntregavelOrdemServico): TypeValidaEntregavel => {
    let errosInput: TypeValidaEntregavel = {} as TypeValidaEntregavel;

    errosInput.descricao =
        entregavel.descricao == null || entregavel.descricao.trim() == ''
            ? 'Uma descrição para o entregável da Ordem de Serviço deve ser informada'
            : '';
    return errosInput;
};
