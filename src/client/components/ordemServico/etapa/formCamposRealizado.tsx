import {Grid} from '@material-ui/core';
import 'date-fns';
import React from 'react';
import {ITipoOrdemServicoContrato} from '../../../../commonLib/interface-models';
import {CampoData} from '../../lib/CampoData';
import {CampoLista} from '../../lib/campoLista';
import {CampoTexto} from '../../lib/campoTexto';

export const FormCamposRealizado: React.FC<{
    inputs: any;
    tipoOrdemServico: ITipoOrdemServicoContrato;
    pode: any;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errosInput: {[atributo: string]: boolean};
}> = (props, ref) => {
    const {inputs, tipoOrdemServico, pode, onInputChange, errosInput} = props;

    return (
        <React.Fragment>
            <Grid item xs={tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa ? 2 : 4}>
                <CampoTexto
                    fullWidth={true}
                    atributo="descricao"
                    label="Etapa"
                    objetoValor={inputs}
                    somenteLeitura={!pode.editarDescricao().ok}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.descricao}
                    autoFocus={true}
                />
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
                <CampoLista
                    atributo="idResultadoEtapa"
                    label="Aceite"
                    objetoValor={inputs}
                    fullWidth={false}
                    somenteLeitura={inputs.dtInicioReal == null || inputs.dtFimReal == null}
                    onChange={onInputChange}
                    opcoes={[
                        {valor: null, label: ''},
                        {valor: 'A', label: 'Total'},
                        {valor: 'P', label: 'Parcial'},
                        {valor: 'R', label: 'Rejeitado'},
                    ]}
                    error={errosInput.idResultadoEtapa}
                />
            </Grid>
        </React.Fragment>
    );
};
