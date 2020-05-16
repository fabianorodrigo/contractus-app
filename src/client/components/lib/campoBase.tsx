import {TextField} from '@material-ui/core';
import React from 'react';

export const CampoBase: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    fullWidth?: boolean;
    margin?: number;
    className?: string;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange?: any;
    select?: boolean;
    defaultValue?: any;
    funcaoFormatacao?: Function;
    type?: string;

    helperText?: string;
    error?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    autoFocus?: boolean;
}> = (props) => {
    const {
        atributo,
        label,
        objetoValor,
        fullWidth,
        margin,
        className,
        somenteLeitura,
        obrigatorio,
        onChange,
        select,
        defaultValue,
        funcaoFormatacao,
        type,
        helperText,
        error,
        inputRef,
        autoFocus,
    } = props;
    let valor = funcaoFormatacao ? funcaoFormatacao(objetoValor[atributo]) : objetoValor[atributo];
    return (
        <TextField
            id={atributo}
            name={atributo}
            label={label}
            style={{margin: margin != undefined ? margin : 8}}
            fullWidth={fullWidth}
            className={className}
            select={select}
            defaultValue={defaultValue !== null ? defaultValue : valor}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                readOnly: somenteLeitura,
            }}
            required={obrigatorio}
            onChange={somenteLeitura ? null : onChange}
            value={valor}
            type={type ? type : undefined}
            helperText={helperText}
            error={error}
            inputRef={inputRef}
            autoFocus={autoFocus}
        >
            {props.children}
        </TextField>
    );
};
