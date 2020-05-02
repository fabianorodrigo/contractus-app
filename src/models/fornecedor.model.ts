import {Entity, model, property} from '@loopback/repository';

@model({
    settings: {
        postgresql: {
            schema: 'contractusapp',
            table: 'TB_FORNECEDOR',
        },
    },
})
export class Fornecedor extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
        postgresql: {
            columnName: 'ID_FORNECEDOR',
        },
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NR_CNPJ_FORNECEDOR',
            dataType: 'bigint',
        },
    })
    cnpj: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_RAZAO_SOCIAL',
        },
    })
    razaoSocial: string;

    @property({
        type: 'string',
        required: true,
        postgresql: {
            columnName: 'NM_APELIDO',
        },
    })
    apelido: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'TX_ENDERECO',
        },
    })
    endereco?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NM_BAIRRO',
        },
    })
    bairro?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NM_CIDADE',
        },
    })
    cidade?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'SG_UF',
        },
    })
    uf?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'TX_EMAIL',
        },
    })
    email?: string;

    @property({
        type: 'string',
        postgresql: {
            columnName: 'NR_TELEFONE',
        },
    })
    telefone?: string;

    constructor(data?: Partial<Fornecedor>) {
        super(data);
    }
}

export interface FornecedorRelations {
    // describe navigational properties here
}

export type FornecedorWithRelations = Fornecedor & FornecedorRelations;
