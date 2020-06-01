import {Entity, model, property} from '@loopback/repository';
import {EntregavelRecebimentoOrdemServico} from './entregavel-recebimento-ordem-servico.model';

@model()
export class RecebimentoOrdemServicoFull extends Entity {
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
    idOrdemServico: number;

    @property({
        type: 'string',
        required: true,
        default: 'P',
    })
    tipoRecebimento: string;

    @property({
        type: 'date',
        required: true,
    })
    dtRecebimento: string;

    @property({
        type: 'number',
    })
    numeroDocumentoTermoRecebimentoSEI?: number;

    @property({
        type: 'string',
    })
    linkTermoRecebimentoSEI?: string;

    @property({
        type: 'array',
        itemType: 'object',
        required: true,
    })
    entregaveis: EntregavelRecebimentoOrdemServico[];

    constructor(data?: Partial<RecebimentoOrdemServicoFull>) {
        super(data);
    }
}

export interface RecebimentoOrdemServicoFullRelations {
    // describe navigational properties here
}

export type RecebimentoOrdemServicoFullWithRelations = RecebimentoOrdemServicoFull &
    RecebimentoOrdemServicoFullRelations;
