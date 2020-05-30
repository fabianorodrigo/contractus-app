import {Model, model, property} from '@loopback/repository';

@model()
export class OrdemServicoFull extends Model {
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
    idContrato: number;

    @property({
        type: 'number',
    })
    numero?: number;

    @property({
        type: 'boolean',
        required: true,
        default: false,
    })
    emergencial: boolean;

    @property({
        type: 'number',
        required: true,
    })
    idTipoOrdemServicoContrato: number;

    @property({
        type: 'date',
    })
    dtEmissao?: string;

    @property({
        type: 'string',
    })
    idProjeto?: string;

    @property({
        type: 'string',
    })
    idProduto?: string;

    @property({
        type: 'number',
        required: true,
    })
    idAreaRequisitante: number;

    @property({
        type: 'string',
    })
    cpfRequisitante?: string;

    @property({
        type: 'string',
        required: true,
    })
    nomeRequisitante: string;

    @property({
        type: 'string',
    })
    cpfFiscalTecnico?: string;

    @property({
        type: 'string',
        required: true,
    })
    nomeFiscalTecnico: string;

    @property({
        type: 'number',
    })
    numeroDocumentoOrdemServicoSEI?: number;

    @property({
        type: 'string',
        nullable: true,
        default: null,
    })
    linkOrdemServicoSEI?: string;

    @property({
        type: 'date',
    })
    dtCancelamento?: string;

    @property({
        type: 'array',
        itemType: 'object',
        required: true,
    })
    itens: object[];

    @property({
        type: 'array',
        itemType: 'object',
    })
    etapas: object[];

    @property({
        type: 'array',
        itemType: 'object',
        required: false,
    })
    entregaveis: object[];

    @property({
        type: 'array',
        itemType: 'object',
    })
    indicadores?: object[];

    constructor(data?: Partial<OrdemServicoFull>) {
        super(data);
    }
}

export interface OrdemServicoFullRelations {
    // describe navigational properties here
}

export type OrdemServicoFullWithRelations = OrdemServicoFull & OrdemServicoFullRelations;
