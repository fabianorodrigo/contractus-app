import {Grid} from '@material-ui/core';
import 'date-fns';
import React from 'react';
import {ITipoOrdemServicoContrato} from '../../../../commonLib/interface-models';
import {CampoData} from '../../lib/CampoData';
import {CampoTexto} from '../../lib/campoTexto';
export const FormCamposRealizado: React.FC<{
    inputs: any;
    tipoOrdemServico: ITipoOrdemServicoContrato;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errosInput: {[atributo: string]: boolean};
}> = (props) => {
    const {inputs, tipoOrdemServico, onInputChange, errosInput} = props;
    return (
        <React.Fragment>
            <Grid item xs={3}>
                <CampoData
                    fullWidth={true}
                    atributo="dtInicioReal"
                    label="Início Realizado"
                    objetoValor={inputs}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtInicioReal}
                    desabilitaDatasFuturas={true}
                />
            </Grid>
            <Grid item xs={3}>
                <CampoData
                    fullWidth={true}
                    atributo="dtFimReal"
                    label="Conclusão Realizada"
                    objetoValor={inputs}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtFimReal}
                    desabilitaDatasFuturas={true}
                />
            </Grid>
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <Grid item xs={2}>
                    <CampoTexto
                        fullWidth={true}
                        atributo="valorAdiantamentoReal"
                        label="Valor Antecipado"
                        objetoValor={inputs}
                        obrigatorio={true}
                        onChange={onInputChange}
                        type="number"
                        error={errosInput.valorAdiantamentoReal}
                    />
                </Grid>
            )}
        </React.Fragment>
    );
};
