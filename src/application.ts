import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {
    JWTAuthenticationStrategy,
    SECURITY_SCHEME_SPEC,
    TokenServiceBindings,
    UserServiceBindings,
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {
    AutenticacaoLDAP,
    BcryptHasher,
    JWTService,
    LDAPBindings,
    PasswordHasherBindings,
    UsuarioService,
} from './security';
import {ContractusAppSequence} from './sequence';

export interface PackageInfo {
    name: string;
    version: string;
    description: string;
}

//Autenticação JWT conforme tutorial: https://medium.com/@MobileDiana/add-jwt-authentication-in-your-loopback-4-application-325137642c2c e
// https://loopback.io/doc/en/lb4/Authentication-Tutorial.html#creating-a-custom-sequence-and-adding-the-authentication-action
export class ContractusAppApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        //setando os bindings
        this.setupBindings();
        //adicionando as specs de segurança OpenAPI
        this.addSecuritySpec();

        // Set up the custom sequence
        this.sequence(ContractusAppSequence);
        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(RestExplorerComponent);
        //Incluindo autenticação no projeto
        this.component(AuthenticationComponent);
        // Mount jwt component
        //this.component(JWTAuthenticationComponent);
        //registrando a estratégia de autenticação customizada JWT
        registerAuthenticationStrategy(this as any, JWTAuthenticationStrategy);
        this.add(createBindingFromClass(JWTAuthenticationStrategy));

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }

    setupBindings(): void {
        //Setando o datasource com dados de variáveis de ambiente
        //TL;DR: if you are using @loopback/boot to load your datasources (as is the default in LB4 applications
        //scaffolded using lb4 CLI tool), then you can bind just the custom datasource configuration.
        this.bind('datasources.config.contractusDataSource').to({
            name: 'contractusDataSource',
            connector: 'postgresql',
            host: process.env.POSTGRES_HOST || 'Variável de ambiente POSTGRES_HOST sem valor',
            port: process.env.POSTGRES_PORT || 'Variável de ambiente POSTGRES_PORT sem valor',
            user: process.env.POSTGRES_USER || 'Variável de ambiente POSTGRES_USER sem valor',
            password: process.env.POSTGRES_PASSWORD || 'Variável de ambiente POSTGRES_PASSWORD sem valor',
            database: process.env.POSTGRES_DATABASE || 'Variável de ambiente POSTGRES_DATABASE sem valor',
        });

        // Bind bcrypt hash - utilizado por 'UsuarioController' e 'UsuarioService'
        this.bind(PasswordHasherBindings.ROUNDS).to(10);
        this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
        this.bind(UserServiceBindings.USER_SERVICE).toClass(UsuarioService);

        // setando jwtSecret e jwtExpiresIn utilizadas para assinar e verificar tokens JWT
        this.bind(TokenServiceBindings.TOKEN_SECRET).to(process.env.JWT_TOKEN_SECRET);
        this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(process.env.JWT_TOKEN_EXPIRES_IN);
        this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

        //setando as configurações do LDAP Para autenticação
        this.bind(LDAPBindings.LDAP_URL).to(process.env.LDAP_URL as string);
        this.bind(LDAPBindings.LDAP_BASE_DN).to(process.env.LDAP_BASE_DN as string);
        this.bind(LDAPBindings.LDAP_USERNAME).to(process.env.LDAP_USERNAME as string);
        this.bind(LDAPBindings.LDAP_PASSWORD).to(process.env.LDAP_PASSWORD as string);
        this.bind(LDAPBindings.LDAP_AUTENTICADOR).toClass(AutenticacaoLDAP);

        //setando datasource SEI com base nas variáveis de ambiente
        this.bind('datasources.config.SEI').to({
            name: 'seiDataSource',
            connector: 'soap',
            url: process.env.SEI_URL || 'Variável de ambiente SEI_URL sem valor',
            wsdl: process.env.SEI_WSDL_URL || 'Variável de ambiente SEI_WSDL_URL sem valor',
            remotingEnabled: true,
            operations: {
                incluirDocumento: {
                    service: 'SeiWS',
                    port: 'SeiPortService',
                    operation: 'incluirDocumento',
                },
                consultarDocumento: {
                    service: 'SeiWS',
                    port: 'SeiPortService',
                    operation: 'consultarDocumento',
                },
            },
        });
    }

    addSecuritySpec(): void {
        const pkg: PackageInfo = require('../package.json');
        this.api({
            openapi: '3.0.0',
            info: {title: pkg.name, version: pkg.version},
            paths: {},
            components: {securitySchemes: SECURITY_SCHEME_SPEC},
            // Inclui segurança em todos os endpoints com 'jwt'
            security: [{jwt: []}],
            servers: [{url: '/'}],
        });
    }
}
