import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './hash.password.bcryptjs';
import {AutenticacaoLDAP} from './LDAP';

export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>('services.hasher');
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace LDAPBindings {
    export const LDAP_AUTENTICADOR = BindingKey.create<AutenticacaoLDAP>('services.ldap');
    export const LDAP_URL = BindingKey.create<string>('services.ldap.url');
    export const LDAP_BASE_DN = BindingKey.create<string>('services.ldap.baseDN');
    export const LDAP_USERNAME = BindingKey.create<string>('services.ldap.username');
    export const LDAP_PASSWORD = BindingKey.create<string>('services.ldap.password');
}
