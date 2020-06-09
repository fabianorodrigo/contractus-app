import {BindingKey} from '@loopback/context';
import {PasswordHasher} from './hash.password.bcryptjs';

export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>('services.hasher');
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}
