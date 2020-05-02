import React, {FormEvent} from 'react';
import {EditionType, IEntidadeContexto} from '../models/EntidadeContext';

/**
 * It is very important that the name of this functional component starts with “use”.
 * This functional component is actually going to be our custom hook.
 * And in order for React to recognize any custom hooks in our apps, their name should start with “use”.
 * @param callback function that gets called whenever the user submits the form
 * @param valorInicial Valor inicial do form que será carregado
 * @param entidadeContexto Contexto da entidade ao qual o form se refere. Se for passado, quando houver mudanças no input, o contexto será atualizado também
 */
export const useFormHook = <T extends {}>(
    callback: Function,
    valorInicial: T,
    entidadeContexto?: IEntidadeContexto<T>,
) => {
    const [inputs, setInputs] = React.useState<T>(valorInicial);
    const [tiposAtributos] = React.useState(typeOfAtributos(valorInicial));
    //trata o submit do formulário
    const onSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent) => {
        if (event) {
            event.preventDefault();
        }
        callback(inputs);
    };
    //trata das mudanças de valores
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valor: any;

        if (event.persist) {
            event.persist();
        }
        valor = event.target.value;
        if (tiposAtributos[event.target.name] == 'number') {
            valor = valor.indexOf('.') > -1 || valor.indexOf(',') > -1 ? parseFloat(valor) : parseInt(valor);
        } else if (tiposAtributos[event.target.name] == 'boolean') {
            valor = Boolean(valor == true || valor == 'true');
        }
        if (entidadeContexto) {
            const entidade = entidadeContexto.state;
            (entidade.dado as any)[event.target.name] = valor;
            entidadeContexto.dispatch({
                tipo: EditionType.ATUALIZAR_CONTEXTO,
                dado: {...entidade.dado} as T,
            });
        }
        setInputs((inputs) => ({...inputs, [event.target.name]: valor}));
    };
    //trata inclusão de itens em propriedades arrays
    const addItemArray = (nomepropriedadeArray: string, item: object) => {
        if (entidadeContexto) {
            const entidade = entidadeContexto.state;
            let valorFinal: Array<any>;
            const cloneItem = JSON.parse(JSON.stringify(item));
            if ((entidade.dado as any)[nomepropriedadeArray] == null) {
                valorFinal = [cloneItem];
            } else {
                valorFinal = (entidade.dado as any)[nomepropriedadeArray].concat(cloneItem);
            }
            (entidade.dado as any)[nomepropriedadeArray] = valorFinal;
            entidadeContexto.dispatch({
                tipo: EditionType.ATUALIZAR_CONTEXTO,
                dado: {...entidade.dado} as T,
            });
        } else {
            console.warn('addItemArray: entidadeContexto não setada');
        }
        /* testando remoção do código que mexe no input pois estava dando exceção no remover
        setInputs((inputs) => ({
            ...inputs,
            [nomepropriedadeArray]: valorFinal,
        }));
        */
    };
    //trata inclusão de itens em propriedades arrays
    const markToRemoveItemArray = (nomepropriedadeArray: string, indice: number) => {
        if (entidadeContexto) {
            const entidade = entidadeContexto.state;
            if ((entidade.dado as any)[nomepropriedadeArray][indice].id) {
                (entidade.dado as any)[nomepropriedadeArray][indice].toDelete = true;
            } else {
                (entidade.dado as any)[nomepropriedadeArray].splice(indice, 1);
            }
            entidadeContexto.dispatch({
                tipo: EditionType.ATUALIZAR_CONTEXTO,
                dado: {...entidade.dado} as T,
            });
        } else {
            console.warn('markToRemoveItemArray: entidadeContexto não setada');
        }
        /* testando remoção do código que mexe no input pois estava dando exceção
        if ((inputs as any)[nomepropriedadeArray][indice].id) {
            (inputs as any)[nomepropriedadeArray][indice].toDelete = true;
        } else {
            (inputs as any)[nomepropriedadeArray].splice(indice, 1);
        }
        setInputs((inputs) => ({
            ...inputs,
            [nomepropriedadeArray]: (inputs as any)[nomepropriedadeArray],
        }));
        */
    };

    return {
        onSubmit,
        onInputChange,
        addItemArray,
        markToRemoveItemArray,
        inputs,
    };
};

function typeOfAtributos(obj: {[atributo: string]: any}) {
    const retorno: {[atributo: string]: any} = {};
    Object.keys(obj).forEach((k) => {
        retorno[k] = typeof obj[k];
    });
    return retorno;
}
