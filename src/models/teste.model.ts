import {Model, model, property} from '@loopback/repository';
import {ItemOrdemServico} from './item-ordem-servico.model';

@model()
export class Teste extends Model {
    @property({
        type: 'number',
        required: true,
    })
    idContrato: number;

    @property({
        type: 'array',
        itemType: 'object',
        required: true,
    })
    itens: ItemOrdemServico[];

    constructor(data?: Partial<Teste>) {
        super(data);
    }
}

export interface TesteRelations {
    // describe navigational properties here
}

export type TesteWithRelations = Teste & TesteRelations;
