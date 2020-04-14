import React, {FormEvent} from 'react';

/**
 * It is very important that the name of this functional component starts with “use”.
 * This functional component is actually going to be our custom hook.
 * And in order for React to recognize any custom hooks in our apps, their name should start with “use”.
 * @param callback function that gets called whenever the user submits the form
 */
export const useFormHook = (callback: Function, initValue: object) => {
    const [inputs, setInputs] = React.useState<{[atributo: string]: any}>(initValue);
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
        setInputs((inputs) => ({...inputs, [event.target.name]: event.target.value}));
    };
    //trata inclusão de itens em propriedades arrays
    const addItemArray = (nomepropriedadeArray: string, item: object) => {
        /*const arrayUpToDate = JSON.parse(JSON.stringify(inputs[nomepropriedadeArray]));
        arrayUpToDate.push(JSON.parse(JSON.stringify(item)));
        //console.log(item, arrayUpToDate);
        console.log(item, arrayUpToDate);*/
        setInputs((inputs) => ({
            ...inputs,
            [nomepropriedadeArray]: inputs[nomepropriedadeArray].concat(JSON.parse(JSON.stringify(item))),
        }));
        console.log('inputs', inputs);
    };
    //trata inclusão de itens em propriedades arrays
    const removeItemArray = (nomepropriedadeArray: string, indice: number) => {
        inputs[nomepropriedadeArray].splice(indice, 1);
        //TODO: setInputs((inputs) => ({...inputs, [nomepropriedadeArray]: }));
    };

    return {
        onSubmit,
        onInputChange,
        addItemArray,
        removeItemArray,
        inputs,
    };
};
