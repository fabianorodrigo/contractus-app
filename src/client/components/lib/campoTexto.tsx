import React from 'react';
import {CampoBase} from './campoBase';

export const CampoTexto: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    fullWidth?: boolean;
    margin?: number;
    className?: string;
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange?: Function;
    funcaoFormatacao?: Function;
    type?: string;
    helperText?: string;
    error?: boolean;
    autoFocus?: boolean;
}> = ({
    atributo,
    label,
    objetoValor,
    fullWidth,
    margin,
    className,
    somenteLeitura,
    obrigatorio,
    onChange,
    funcaoFormatacao,
    type,
    helperText,
    error,
    autoFocus,
}) => {
    return (
        <CampoBase
            atributo={atributo}
            label={label}
            fullWidth={fullWidth}
            className={className}
            margin={margin}
            somenteLeitura={somenteLeitura}
            obrigatorio={obrigatorio}
            onChange={onChange}
            objetoValor={objetoValor}
            funcaoFormatacao={funcaoFormatacao}
            type={type}
            helperText={helperText}
            error={error}
            autoFocus={autoFocus}
        />
    );
};
