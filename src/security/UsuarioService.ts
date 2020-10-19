import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Credentials} from '../commonLib/interface-models/Credentials';
import {Usuario} from '../models/usuario.model';
import {PasswordHasher} from './hash.password.bcryptjs';
import {LDAPBindings, PasswordHasherBindings} from './keys';
import {AutenticacaoLDAP} from './LDAP';

export class UsuarioService implements UserService<Usuario, Credentials> {
    constructor(
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
        @inject(LDAPBindings.LDAP_AUTENTICADOR)
        public autenticadorLDAP: AutenticacaoLDAP,
    ) {}

    async verifyCredentials(credentials: Credentials): Promise<Usuario> {
        const usuario = await this.autenticadorLDAP.autenticar(credentials.login, credentials.password);
        if (usuario == null) {
            throw new HttpErrors.NotFound(`Usuário e/ou senha inválidos.`);
        }
        return usuario;
    }

    convertToUserProfile(usuario: Usuario): UserProfile {
        return {
            [securityId]: usuario.login,
            id: usuario.id.toString(),
            name: usuario.nomeCompleto,
            email: usuario.email,
        };
    }

    async findById(login: string): Promise<Usuario | undefined> {
        return await this.autenticadorLDAP.buscarUsuario(login);
    }
}
