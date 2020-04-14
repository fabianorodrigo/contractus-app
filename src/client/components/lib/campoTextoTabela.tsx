import React from 'react';
import {CampoBase} from './campoBase';

export const CampoTextoTabela: React.FC<{
    atributo: string;
    label: string;
    objetoValor: {[atributo: string]: any};
    somenteLeitura?: boolean;
    obrigatorio?: boolean;
    onChange?: Function;
    funcaoFormatacao?: Function;
    type?: string;
    helperText?: string;
}> = ({atributo, label, objetoValor, somenteLeitura, obrigatorio, onChange, funcaoFormatacao, type, helperText}) => {
    return (
        <CampoBase
            atributo={atributo}
            label={label}
            somenteLeitura={somenteLeitura}
            obrigatorio={obrigatorio}
            onChange={onChange}
            objetoValor={objetoValor}
            funcaoFormatacao={funcaoFormatacao}
            type={type}
            margin={0}
            helperText={helperText}
        />
    );
};
