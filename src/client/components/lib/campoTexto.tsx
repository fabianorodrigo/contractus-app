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
        />
    );
};
