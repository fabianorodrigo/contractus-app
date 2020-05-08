import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {SeiDataSource} from '../datasources';
import {consultarDocumentoRequest, consultarDocumentoResponse} from './ConsultarDocumento';
import {incluirDocumentoRequest, incluirDocumentoResponse} from './IncluirDocumento';

export interface SeiService {
    incluirDocumento(args: incluirDocumentoRequest): Promise<incluirDocumentoResponse>;
    consultarDocumento(args: consultarDocumentoRequest): Promise<consultarDocumentoResponse>;
}

export class SeiServiceProvider implements Provider<SeiService> {
    constructor(
        // SEI must match the name property in the datasource json file
        @inject('datasources.seiDataSource')
        protected dataSource: SeiDataSource = new SeiDataSource(),
    ) {}

    value(): Promise<SeiService> {
        return getService(this.dataSource);
    }
}
