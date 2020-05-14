import {incluirDocumentoResponse} from './IncluirDocumento';

/**
 * Recebe o objeto retornardo pela invocação do serviço SOAP via conector SOAP
 * do Loopback para um formato simplificado JSON
 */
export function tratarIncluirDocumentoResponse(soap: any): incluirDocumentoResponse {
    return {
        parametros: {
            IdDocumento: soap.result.parametros.IdDocumento.$value,
            DocumentoFormatado: soap.result.parametros.DocumentoFormatado.$value,
            LinkAcesso: soap.result.parametros.LinkAcesso.$value,
        },
    };
}
