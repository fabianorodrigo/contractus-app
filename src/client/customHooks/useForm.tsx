import React, {FormEvent} from 'react';

/**
 * It is very important that the name of this functional component starts with “use”.
 * This functional component is actually going to be our custom hook.
 * And in order for React to recognize any custom hooks in our apps, their name should start with “use”.
 * @param callback function that gets called whenever the user submits the form
 */
export const useFormHook = (callback: Function, valorInicial: object) => {
    const [inputs, setInputs] = React.useState<{[atributo: string]: any}>(valorInicial);
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
        event.persist();
        let valor = tiposAtributos[event.target.name] == 'number' ? parseInt(event.target.value) : event.target.value;
        setInputs((inputs) => ({...inputs, [event.target.name]: valor}));
    };
    //trata inclusão de itens em propriedades arrays
    const addItemArray = (nomepropriedadeArray: string, item: object) => {
        let valorFinal: Array<any>;
        const cloneItem = JSON.parse(JSON.stringify(item));
        if (inputs[nomepropriedadeArray] == null) {
            valorFinal = [cloneItem];
        } else {
            valorFinal = inputs[nomepropriedadeArray].concat(cloneItem);
        }

        setInputs((inputs) => ({
            ...inputs,
            [nomepropriedadeArray]: valorFinal,
        }));
    };
    //trata inclusão de itens em propriedades arrays
    const markToRemoveItemArray = (nomepropriedadeArray: string, indice: number) => {
        if (inputs[nomepropriedadeArray][indice].id) {
            inputs[nomepropriedadeArray][indice].toDelete = true;
        } else {
            inputs[nomepropriedadeArray].splice(indice, 1);
        }
        setInputs((inputs) => ({
            ...inputs,
            [nomepropriedadeArray]: inputs[nomepropriedadeArray],
        }));
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
