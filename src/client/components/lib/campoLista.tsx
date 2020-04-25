import {FormControl, FormHelperText, InputLabel, Select} from '@material-ui/core';
import React from 'react';

export interface SelectItens {
    valor: any;
    label: string;
}

export const SelectItemNulo: SelectItens = {valor: -1, label: ''};

export const CampoLista: React.FC<{
    atributo: string;
    label?: string;
    objetoValor: {[atributo: string]: any};
    opcoes: SelectItens[];
    fullWidth?: boolean;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange: any;
    defaultValue?: any;
    margin?: number;
    helperText?: string;
    error?: boolean;
    autoFocus?: boolean;
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
        margin,
        helperText,
        error,
        autoFocus,
    } = props;
    return (
        <FormControl fullWidth={fullWidth} style={{margin: margin != undefined ? margin : 8}}>
            {label && (
                <InputLabel shrink htmlFor={atributo} error={error}>
                    {label}
                </InputLabel>
            )}
            <Select
                autoFocus={autoFocus}
                native
                id={atributo}
                name={atributo}
                label={label}
                inputProps={{
                    readOnly: somenteLeitura,
                }}
                required={obrigatorio}
                onChange={somenteLeitura ? null : onChange}
                value={objetoValor[atributo]}
                error={error}
            >
                {opcoes.map((opcao) => (
                    <option key={`${atributo}-option-${opcao.valor}`} value={opcao.valor}>
                        {opcao.label}
                    </option>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
