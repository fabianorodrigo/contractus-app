import {Grid} from '@material-ui/core';
import 'date-fns';
import React from 'react';
import {TipoOrdemServicoContrato} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {CampoData} from '../../lib/CampoData';
import {CampoTexto} from '../../lib/campoTexto';
export const FormCamposPlanejamento: React.FC<{
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
                    atributo="dtInicioPlanejada"
                    label="Início Planejado"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtInicioPlanejada != ''}
                />
            </Grid>
            <Grid item xs={3}>
                <CampoData
                    fullWidth={true}
                    atributo="dtFimPlanejada"
                    label="Conclusão Planejada"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.dtFimPlanejada != ''}
                />
            </Grid>
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <Grid item xs={2}>
                    <CampoTexto
                        fullWidth={true}
                        atributo="valorAdiantamentoPlanejado"
                        label="Valor Planejado"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
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
