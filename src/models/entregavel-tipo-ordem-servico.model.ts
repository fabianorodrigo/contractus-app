import {Entity, model, property} from '@loopback/repository';

@model()
export class EntregavelTipoOrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
    })
    idTipoOrdemServicoContrato: number;

    @property({
        type: 'string',
        required: true,
    })
    descricao: string;

    @property({
        type: 'number',
    })
    ordem?: number;

    constructor(data?: Partial<EntregavelTipoOrdemServico>) {
        super(data);
    }
}

export interface EntregaveisTipoOrdemServicoRelations {
    // describe navigational properties here
}

export type EntregaveisTipoOrdemServicoWithRelations = EntregavelTipoOrdemServico &
    EntregaveisTipoOrdemServicoRelations;
