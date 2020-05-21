import {ValidationError} from '../ValidationError';
import {RetornoPermisao} from './RetornoPermisao';
import {TipoUsoPermissoes} from './TipoUsoPermissoes';

export type funcaoConstruirRetorno = (
    resultadoAssert: boolean,
    atributo: string,
    mensagem: string,
    retornoParcial?: RetornoPermisao,
) => RetornoPermisao;

export type ConstrutorRetornoPermissoes = {
    tipoUso: TipoUsoPermissoes;
    construir: funcaoConstruirRetorno;
};

export const ConstrutorRetornoPermissoesFactory = (tipoUso: TipoUsoPermissoes): ConstrutorRetornoPermissoes => {
    return {
        tipoUso: tipoUso,
        /**
         * resultadoAssert: validação boolean que indica o estado válido
         */
        construir: (
            resultadoAssert: boolean,
            atributo: string,
            mensagem: string,
            retornoParcial?: RetornoPermisao,
        ): RetornoPermisao => {
            let retorno: RetornoPermisao;
            if (retornoParcial == null) {
                retorno = {ok: false};
            } else {
                retorno = retornoParcial;
                //Se já era TRUE e o resultado da avaliação veio TRUE, retorna com TRUE
                if (resultadoAssert && retorno.ok) return retorno;
            }
            //Se o uso for VALIDAR_SERVIDOR, lança exceção caso o resultado do assert seja FALSE
            if (resultadoAssert == false && tipoUso == TipoUsoPermissoes.VALIDAR_SERVIDOR)
                throw new ValidationError(422, mensagem);
            retorno.ok = resultadoAssert;
            if (retorno.ok == false) {
                //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outro processamento
                if (tipoUso == TipoUsoPermissoes.HABILITAR_UI) return retorno;
                //senão, continua e dá PUSH na mensagem
                if (retorno.mensagensAtributo == null) retorno.mensagensAtributo = {};
                if (retorno.mensagensAtributo[atributo] == null) retorno.mensagensAtributo[atributo] = [];
                retorno.mensagensAtributo[atributo].push(mensagem);
            }
            return retorno;
        },
    };
};
