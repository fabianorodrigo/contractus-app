import React from 'react';
import {CampoBase} from './campoBase';

export const CampoTexto: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    fullWidth?: boolean;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange?: Function;
    funcaoFormatacao?: Function;
    type?: string;
    helperText?: string;
    error?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
}> = ({
    atributo,
    label,
    objetoValor,
    fullWidth,
    somenteLeitura,
    obrigatorio,
    onChange,
    funcaoFormatacao,
    type,
    helperText,
    error,
    inputRef,
}) => {
    return (
        <CampoBase
            atributo={atributo}
            label={label}
            fullWidth={fullWidth}
            somenteLeitura={somenteLeitura}
            obrigatorio={obrigatorio}
            onChange={onChange}
            objetoValor={objetoValor}
            funcaoFormatacao={funcaoFormatacao}
            type={type}
            helperText={helperText}
            error={error}
            inputRef={inputRef}
        />
    );
};
