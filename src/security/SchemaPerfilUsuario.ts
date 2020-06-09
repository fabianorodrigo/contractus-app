export const SchemaPerfilUsuario = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {type: 'string'},
        email: {type: 'string'},
        name: {type: 'string'},
    },
};
