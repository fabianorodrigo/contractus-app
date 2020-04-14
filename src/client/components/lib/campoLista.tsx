import React from 'react';
import {CampoBase} from './campoBase';

export interface SelectItens {
    valor: any;
    label: string;
}

export const SelectItemNulo: SelectItens = {valor: -1, label: ''};

export const CampoLista: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    opcoes: SelectItens[];
    fullWidth?: boolean;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange: any;
    defaultValue?: any;
}> = (props) => {
    const {
        atributo,
        label,
        objetoValor,
        opcoes,
        fullWidth,
        somenteLeitura,
        obrigatorio,
        onChange,
        defaultValue,
    } = props;
    return (
        <CampoBase
            atributo={atributo}
            label={label}
            fullWidth={fullWidth}
            somenteLeitura={somenteLeitura}
            obrigatorio={obrigatorio}
            onChange={onChange}
            objetoValor={objetoValor}
            select={true}
            defaultValue={defaultValue}
        >
            {opcoes.map((opcao) => (
                <option key={`${atributo}-option-${opcao.valor}`} value={opcao.valor}>
                    {opcao.label}
                </option>
            ))}
        </CampoBase>
    );
};
