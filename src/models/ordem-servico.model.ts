import {Entity, hasMany, model, property} from '@loopback/repository';
import {EntregavelOrdemServico} from './entregavel-ordem-servico.model';
import {EtapaOrdemServico} from './etapa-ordem-servico.model';
import {IndicadorOrdemServico} from './indicador-ordem-servico.model';
import {ItemOrdemServico} from './item-ordem-servico.model';

@model()
export class OrdemServico extends Entity {
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
        required: false,
    })
    numero?: number;

    @property({
        type: 'boolean',
        required: true,
    })
    emergencial: boolean;

    @property({
        type: 'number',
        required: true,
    })
    idTipoOrdemServicoContrato: number;

    @property({
        type: 'date',
        required: false,
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
        type: 'string',
        required: false,
    })
    cpfRequisitante?: string;

    @property({
        type: 'string',
        required: true,
    })
    nomeRequisitante: string;

    @property({
        type: 'string',
        required: false,
    })
    cpfFiscalTecnico?: string;

    @property({
        type: 'string',
        required: true,
    })
    nomeFiscalTecnico: string;

    @property({
        type: 'number',
        nullable: true,
        default: null,
    })
    numeroDocumentoSEIOrdemServico?: number;

    @property({
        type: 'number',
        nullable: true,
        default: null,
    })
    numeroDocumentoSEITermoRecebimentoDefinitivo?: number;

    @property({
        type: 'date',
        nullable: true,
        default: null,
    })
    dtCancelamento?: string;

    @hasMany(() => ItemOrdemServico, {keyTo: 'idOrdemServico'})
    itens: ItemOrdemServico[];

    @hasMany(() => EtapaOrdemServico, {keyTo: 'idOrdemServico'})
    etapas: EtapaOrdemServico[];

    @hasMany(() => EntregavelOrdemServico, {keyTo: 'idOrdemServico'})
    entregaveis: EntregavelOrdemServico[];

    @hasMany(() => IndicadorOrdemServico, {keyTo: 'idOrdemServico'})
    indicadores: IndicadorOrdemServico[];

    constructor(data?: Partial<OrdemServico>) {
        super(data);
    }
}

export interface OrdemServicoRelations {
    // describe navigational properties here
}

export type OrdemServicoWithRelations = OrdemServico & OrdemServicoRelations;
