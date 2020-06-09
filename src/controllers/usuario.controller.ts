// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@loopback/authentication';
import {TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {get, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {
    Credentials,
    CredentialsRequestBody,
    OPERATION_SECURITY_SPEC,
    PasswordHasherBindings,
    SchemaPerfilUsuario,
    Usuario,
    UsuarioService,
} from '../security';
import {PasswordHasher} from '../security/hash.password.bcryptjs';

export class UsuarioController {
    constructor(
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: UserService<Usuario, Credentials>,
    ) {}

    @post('/usuario/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{token: string}> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);

        return {token};
    }

    @get('/users/me', {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: 'O profile do usuário corrente',
                content: {
                    'application/json': {
                        schema: SchemaPerfilUsuario,
                    },
                },
            },
        },
    })
    async printCurrentUser(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
    ): Promise<Usuario | undefined> {
        const userId = currentUserProfile[securityId];
        return (this.userService as UsuarioService).findById(userId);
    }
}
