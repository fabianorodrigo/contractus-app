import {KeyboardDatePicker} from '@material-ui/pickers';
import React from 'react';

export const CampoData: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    fullWidth?: boolean;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange: Function;
    margin?: number;
    funcaoFormatacao?: Function;
    helperText?: string;
    error?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    autoFocus?: boolean;
}> = ({
    atributo,
    label,
    objetoValor,
    fullWidth,
    somenteLeitura,
    obrigatorio,
    onChange,
    margin,
    helperText,
    error,
    inputRef,
    autoFocus,
}) => {
    return (
        <KeyboardDatePicker
            margin="normal"
            id={atributo}
            label={label}
            fullWidth={fullWidth}
            style={{margin: margin != undefined ? margin : 8}}
            format="dd/MM/yyyy"
            value={objetoValor[atributo] == undefined ? null : objetoValor[atributo]}
            onChange={(date: any, value?: string | null | undefined) => {
                onChange({target: {name: atributo, value: date}});
            }}
            KeyboardButtonProps={{
                'aria-label': 'Mudar data',
            }}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                readOnly: somenteLeitura,
            }}
            required={obrigatorio}
            helperText={helperText}
            error={error}
            inputRef={inputRef}
            autoFocus={autoFocus}
        />
    );
};
