import {KeyboardDatePicker} from '@material-ui/pickers';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';
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
    dataMinima?: ParsableDate;
    dataMaxima?: ParsableDate;
    desabilitaDatasPassadas?: boolean;
    desabilitaDatasFuturas?: boolean;
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
    dataMinima,
    dataMaxima,
    desabilitaDatasPassadas,
    desabilitaDatasFuturas,
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
            readOnly={somenteLeitura}
            required={obrigatorio}
            helperText={helperText}
            error={error}
            inputRef={inputRef}
            autoFocus={autoFocus}
            minDate={dataMinima}
            minDateMessage={`A data não pode ser menor que ${dataMinima?.toString}`}
            maxDate={dataMaxima}
            maxDateMessage={`A data não pode ser posterior a ${dataMaxima?.toString}`}
            disablePast={desabilitaDatasPassadas}
            disableFuture={desabilitaDatasFuturas}
        />
    );
};
