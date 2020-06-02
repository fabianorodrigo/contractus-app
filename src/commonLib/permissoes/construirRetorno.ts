import {ValidationError} from '../ValidationError';
import {RetornoPermisao} from './RetornoPermisao';
import {TipoUsoPermissoes} from './TipoUsoPermissoes';

export type funcaoConstruirRetorno = (
    resultadoAssert: boolean,
    atributo: string,
    mensagem: string,
    retornoParcial?: RetornoPermisao,
) => RetornoPermisao;

export type funcaoConstruirRetornoTudo = (
    validacoes: {resultadoAssert: boolean; atributo: string; mensagem: string}[],
) => RetornoPermisao;

export type funcaoNovaValidacao = (
    resultadoAssert: boolean,
    atributo: string,
    mensagem: string,
) => {resultadoAssert: boolean; atributo: string; mensagem: string};

export type ConstrutorRetornoPermissoes = {
    tipoUso: TipoUsoPermissoes;
    construir: funcaoConstruirRetorno;
    novaValidacao: funcaoNovaValidacao;
    construirTudo: funcaoConstruirRetornoTudo;
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
                retorno = {ok: resultadoAssert};
            } else {
                retorno = retornoParcial;
                //Se já era TRUE e o resultado da avaliação veio TRUE, retorna com TRUE
                if (resultadoAssert && retorno.ok) return retorno;
            }
            //Se o uso for VALIDAR_SERVIDOR, lança exceção caso o resultado do assert seja FALSE
            if (resultadoAssert == false) {
                retorno.ok = resultadoAssert;
                if (tipoUso == TipoUsoPermissoes.VALIDAR_SERVIDOR) throw new ValidationError(422, mensagem);
            }

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
        novaValidacao: (
            resultadoAssert: boolean,
            atributo: string,
            mensagem: string,
        ): {resultadoAssert: boolean; atributo: string; mensagem: string} => {
            return {resultadoAssert: resultadoAssert, atributo: atributo, mensagem: mensagem};
        },
        /**
         * resultadoAssert: validação boolean que indica o estado válido
         */
        construirTudo: (
            validacoes: {resultadoAssert: boolean; atributo: string; mensagem: string}[],
        ): RetornoPermisao => {
            let retorno: RetornoPermisao = {ok: true, mensagensAtributo: {}};
            for (let i = 0; i < validacoes.length; i++) {
                if (validacoes[i].resultadoAssert == false) {
                    retorno.ok = false;
                    if (tipoUso == TipoUsoPermissoes.VALIDAR_SERVIDOR)
                        throw new ValidationError(422, validacoes[i].mensagem);
                    else if (tipoUso == TipoUsoPermissoes.HABILITAR_UI) return retorno;
                    else {
                        if (retorno.mensagensAtributo && retorno.mensagensAtributo[validacoes[i].atributo] == null)
                            retorno.mensagensAtributo[validacoes[i].atributo] = [];
                        (retorno.mensagensAtributo as {[key: string]: string[]})[validacoes[i].atributo].push(
                            validacoes[i].mensagem,
                        );
                    }
                }
            }
            return retorno;
        },
    };
};
