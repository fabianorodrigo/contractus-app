const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        login: {
            type: 'string',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};

export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': {schema: CredentialsSchema},
    },
};
