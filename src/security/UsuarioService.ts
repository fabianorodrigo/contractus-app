import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {Usuario} from '../models/usuario.model';
import {Credentials} from './Credentials';
import {PasswordHasher} from './hash.password.bcryptjs';
import {PasswordHasherBindings} from './keys';

const usuariosTeste = [
    'fabiano.nascimento@ancine.gov.br',
    'ronaldo.gurgel@ancine.gov.br',
    'fabiano.silva@ancine.gov.br',
    'fabricio.cardoso@ancine.gov.br',
    'carlos.candido@ancine.gov.br',
];
const senhaNadaSecreta = 'senhanadasecreta';

export class UsuarioService implements UserService<Usuario, Credentials> {
    constructor(
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
    ) {}

    async verifyCredentials(credentials: Credentials): Promise<Usuario> {
        //FIXME: Só brincando
        const password = await this.passwordHasher.hashPassword(senhaNadaSecreta);
        if (!usuariosTeste.includes(credentials.email)) {
            throw new HttpErrors.NotFound(`Usuário e/ou senha inválidos.`);
        }
        const passwordMatched = await this.passwordHasher.comparePassword(credentials.password, password);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('Usuário e/ou senha inválidos.');
        }

        return {
            email: credentials.email,
            id: usuariosTeste.findIndex((u) => u == credentials.email),
        };
    }

    convertToUserProfile(usuario: Usuario): UserProfile {
        let userName = usuario.email;
        return {[securityId]: usuario.email, id: usuario.id.toString(), name: usuario.email};
    }

    findById(id: string): Usuario | undefined {
        const index = usuariosTeste.findIndex((u) => id == u);
        if (index > -1) {
            return {id: index, email: usuariosTeste[index]};
        }
    }
}
