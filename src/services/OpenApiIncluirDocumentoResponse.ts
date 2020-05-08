import {ResponseObject} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
export const OPENAPI_INCLUIR_DOCUMENTO_RESPONSE: ResponseObject = {
    description: 'Incluir Documento Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'IncluirDocumentoResponse',
                properties: {
                    IdDocumento: {type: 'string'},
                    DocumentoFormatado: {type: 'string'},
                    LinkAcesso: {type: 'string'},
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': {type: 'string'},
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};
