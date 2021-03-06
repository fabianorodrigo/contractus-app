// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {get, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {IUsuario} from '../commonLib';
import {
    Credentials,
    CredentialsRequestBody,
    LOGIN_OPENAPI_SPEC,
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

    @post('/usuario/login', LOGIN_OPENAPI_SPEC)
    async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<IUsuario> {
        // valida usuário e senha
        const user = await this.userService.verifyCredentials(credentials);
        // Converte model Usuario em UserProfile (menos propriedades)
        const userProfile = this.userService.convertToUserProfile(user);
        // cria um JSON Web Token baseado no profile
        const token = await this.jwtService.generateToken(userProfile);
        return {...user, token};
    }

    @get('/usuario/me', {
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
    @authenticate('jwt')
    async printCurrentUser(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
    ): Promise<Usuario | undefined> {
        const login = currentUserProfile[securityId];
        return (this.userService as UsuarioService).findById(login);
    }
}
