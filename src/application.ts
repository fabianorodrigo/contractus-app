import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export class ContractusAppApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(RestExplorerComponent);

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
        //this.bind('datasources.contractusDataSource').toClass(ContractusDataSource);
    }
}
