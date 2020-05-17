import {Grid} from '@material-ui/core';
import 'date-fns';
import React from 'react';
import {TipoOrdemServicoContrato} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {CampoData} from '../../lib/CampoData';
import {CampoTexto} from '../../lib/campoTexto';
export const FormCamposRealizado: React.FC<{
    inputs: any;
    tipoOrdemServico: TipoOrdemServicoContrato;
    statusOrdemServico: StatusOrdemServico;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errosInput: any;
}> = (props) => {
    const {inputs, tipoOrdemServico, statusOrdemServico, onInputChange, errosInput} = props;
    return (
        <React.Fragment>
            <Grid item xs={3}>
                <CampoData
                    fullWidth={true}
                    atributo="dtInicioReal"
                    label="Início Realizado"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico == StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtInicioPlanejada != ''}
                    desabilitaDatasFuturas={true}
                />
            </Grid>
            <Grid item xs={3}>
                <CampoData
                    fullWidth={true}
                    atributo="dtFimReal"
                    label="Conclusão Realizada"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico == StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtFimPlanejada != ''}
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
                        somenteLeitura={statusOrdemServico == StatusOrdemServico.RASCUNHO}
                        obrigatorio={true}
                        onChange={onInputChange}
                        type="number"
                        error={errosInput.valorAdiantamentoPlanejado != ''}
                    />
                </Grid>
            )}
        </React.Fragment>
    );
};
