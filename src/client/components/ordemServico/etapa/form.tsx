import DateFnsUtils from '@date-io/date-fns';
import {Grid, IconButton} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {EtapaOrdemServico, OrdemServicoFull} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {CampoData} from '../../lib/CampoData';
import {CampoTexto} from '../../lib/campoTexto';
import {AddIcon, ClearIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {novaEtapaOrdemServico} from './new';
export const FormEtapaOrdensServico: React.FC<{
    statusOrdemServico: StatusOrdemServico;
    onSubmitItem: Function;
    fechaFormItem: Function;
    inputDescricaoEtapaRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {statusOrdemServico, onSubmitItem, fechaFormItem, inputDescricaoEtapaRef} = props;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        dtInicioPlanejada: '',
        dtFimPlanejada: '',
        dtInicioReal: '',
        dtFimReal: '',
    });
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const valida = (etapa: EtapaOrdemServico) => {
        errosInput.descricao =
            etapa.descricao == null || etapa.descricao.trim() == ''
                ? 'Uma descrição da etapa de execução dos serviços deve ser informada'
                : '';
        errosInput.dtInicioPlanejada =
            etapa.dtInicioPlanejada == null ? 'A data planejada para início da etapa deve ser informada' : '';
        errosInput.dtFimPlanejada =
            etapa.dtFimPlanejada == null
                ? 'A data prevista para conclusão da etapa deve ser informada'
                : etapa.dtInicioPlanejada != null &&
                  ((etapa.dtFimPlanejada as unknown) as Date).getTime() <
                      ((etapa.dtInicioPlanejada as unknown) as Date).getTime()
                ? 'A data prevista para conclusão da etapa dever ser posterior à data de início'
                : '';

        if (Object.values(errosInput).every((v) => v == '')) {
            onSubmitItem(etapa);
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((msg) => {
                if (msg != '') {
                    enqueueSnackbar(msg, {variant: 'warning'});
                }
            });
        }
    };
    const {inputs, onInputChange, onSubmit} = useFormHook(valida, novaEtapaOrdemServico(osState.dado));
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
                <Grid item xs={3}>
                    <CampoTexto
                        fullWidth={true}
                        atributo="descricao"
                        label="Etapa"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > statusOrdemServico}
                        obrigatorio={true}
                        onChange={onInputChange}
                        error={errosInput.descricao != ''}
                        inputRef={inputDescricaoEtapaRef}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoData
                        fullWidth={true}
                        atributo="dtInicioPlanejada"
                        label="Início"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                        obrigatorio={true}
                        onChange={onInputChange}
                        error={errosInput.dtInicioPlanejada != ''}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoData
                        fullWidth={true}
                        atributo="dtFimPlanejada"
                        label="Conclusão"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                        obrigatorio={true}
                        onChange={onInputChange}
                        error={errosInput.dtFimPlanejada != ''}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoData
                        fullWidth={true}
                        atributo="dtInicioReal"
                        label="Início"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > StatusOrdemServico.EMITIDA}
                        obrigatorio={true}
                        onChange={onInputChange}
                        error={errosInput.dtInicioReal != ''}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoData
                        fullWidth={true}
                        atributo="dtFimReal"
                        label="Conclusão"
                        objetoValor={inputs}
                        somenteLeitura={statusOrdemServico > StatusOrdemServico.EMITIDA}
                        obrigatorio={true}
                        onChange={onInputChange}
                        error={errosInput.dtFimReal != ''}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton key={`buttonAddEtapa`} size="small" onClick={onSubmit}>
                        <AddIcon aria-label="Adicionar" color="primary" fontSize="small" />
                    </IconButton>
                    <IconButton
                        key={`buttonClearEtapa`}
                        size="small"
                        onClick={() => {
                            fechaFormItem();
                        }}
                    >
                        <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                    </IconButton>
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
};
