import {inject} from '@loopback/core';
import {Client, SearchOptions} from 'ldapts';
import {Usuario} from '../../models';
import {LDAPBindings} from '../keys';

export class AutenticacaoLDAP {
    private ldapClient: Client;
    constructor(
        @inject(LDAPBindings.LDAP_URL)
        private readonly url: string,
        @inject(LDAPBindings.LDAP_BASE_DN)
        private readonly baseDN: string,
        @inject(LDAPBindings.LDAP_USERNAME)
        private readonly username: string,
        @inject(LDAPBindings.LDAP_PASSWORD)
        private readonly password: string,
    ) {
        this.ldapClient = new Client({
            url: this.url,
            strictDN: true,
        });
    }

    async buscarUsuario(login: string, unbind: boolean = true): Promise<Usuario | undefined> {
        try {
            await this.ldapClient.bind(this.username, this.password);
            const opts: SearchOptions = {
                filter: `(&(objectclass=user)(samaccountname=${login}))`,
                scope: 'sub',
                attributes: ['objectGUID', 'sAMAccountName', 'cn', 'mail', 'manager', 'memberOf'],
            };
            const searchResult = await this.ldapClient.search(this.baseDN, opts);
            if (searchResult.searchEntries.length == 0) {
                return undefined;
            } else if (searchResult.searchEntries.length === 1) {
                try {
                    const user = searchResult.searchEntries[0];
                    return {
                        id: user.objectGUID,
                        nomeCompleto: user.cn as string,
                        login: user.sAMAccountName as string,
                        email: user.mail as string,
                    };
                } catch (e) {
                    console.error(e);
                }
            } else {
                throw new Error(
                    `Login não foi identificado univocamente: ${login} (${searchResult.searchEntries.length})`,
                );
            }
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (unbind) {
                this.ldapClient.unbind();
            }
        }
    }

    async autenticar(login: string, senha: string): Promise<Usuario | null> {
        const usuario = await this.buscarUsuario(login, false);
        if (usuario != null) {
            try {
                await this.ldapClient.bind(usuario.nomeCompleto, senha);
                return usuario;
            } catch (e) {
                console.error(e);
                return null;
            } finally {
                this.ldapClient.unbind();
            }
        } else {
            return null;
        }
    }
}
