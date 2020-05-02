import {Entity, hasMany, model, property} from '@loopback/repository';
import {EntregavelOrdemServico} from './entregavel-ordem-servico.model';
import {EtapaOrdemServico} from './etapa-ordem-servico.model';
import {IndicadorOrdemServico} from './indicador-ordem-servico.model';
import {ItemOrdemServico} from './item-ordem-servico.model';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_ORDEM_SERVICO',
        },
    },
})
export class OrdemServico extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_ORDEM_SERVICO',
        },
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_CONTRATO',
        },
    })
    idContrato: number;

    @property({
        type: 'number',
        required: false,
        postgresql: {
            columnName: 'NR_ORDEM_SERVICO',
        },
    })
    numero?: number;

    @property({
        type: 'boolean',
        required: true,
        postgresql: {
            columnName: 'IN_EMERGENCIAL',
        },
    })
    emergencial: boolean;

    @property({
        type: 'number',
        required: true,
        postgresql: {
            columnName: 'ID_TIPO_ORDEM_SERVICO',
        },
    })
    idTipoOrdemServicoContrato: number;

    @property({
        type: 'date',
        required: false,
        postgresql: {
            columnName: 'DT_EMISSAO',
        },
    })
    dtEmissao?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'ID_PROJETO',
        },
    })
    idProjeto?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'ID_PRODUTO',
        },
    })
    idProduto?: string;

    @property({
        type: 'string',
        required: false,
        postgresql: {
            columnName: 'NR_CPF_REQUISITANTE',
        },
    })
    cpfRequisitante?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_REQUISITANTE',
        },
    })
    nomeRequisitante: string;

    @property({
        type: 'string',
        required: false,
        postgresql: {
            columnName: 'NR_CPF_FISCAL_TECNICO',
        },
    })
    cpfFiscalTecnico?: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_FISCAL_TECNICO',
        },
    })
    nomeFiscalTecnico: string;

    @property({
        type: 'number',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'NR_ORDEM_SERVICO_SEI',
        },
    })
    numeroDocumentoSEIOrdemServico?: number;

    @property({
        type: 'number',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'NR_TERMO_RECEBIMENTO_DEFINITIVO_SEI',
        },
    })
    numeroDocumentoSEITermoRecebimentoDefinitivo?: number;

    @property({
        type: 'date',
        nullable: true,
        default: null,
        postgresql: {
            columnName: 'DT_CANCELAMENTO',
        },
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
