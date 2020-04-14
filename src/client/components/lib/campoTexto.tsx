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
}> = ({atributo, label, objetoValor, fullWidth, somenteLeitura, obrigatorio, onChange, funcaoFormatacao, type}) => {
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
        />
    );
};
