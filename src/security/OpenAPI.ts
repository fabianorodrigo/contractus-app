import {ReferenceObject, SecuritySchemeObject} from '@loopback/openapi-v3';

/**
 * OPERATION_SECURITY_SPEC is an operation-level security requirement object
 * that references the bearerAuth security scheme object definition. It is used
 * by the /usuarios/me
 */
export const OPERATION_SECURITY_SPEC = [{bearerAuth: []}];
export type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};

export const LOGIN_OPENAPI_SPEC = {
    responses: {
        '200': {
            description: 'Usuario & Token',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                            },
                            nomeCompleto: {
                                type: 'string',
                            },
                            login: {
                                type: 'string',
                            },
                            email: {
                                type: 'string',
                            },
                            token: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    },
};
/**
 * SECURITY_SCHEME_SPEC is a map of security scheme object definitions that are
 * defined globally for the application. For our purposes, it only contains a
 * single security scheme object that contains the bearerAuth definition.
 */
/*export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};*/
