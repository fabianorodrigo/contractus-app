import DateFnsUtils from '@date-io/date-fns';
import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
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
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';
import {novaEtapaOrdemServico} from './new';
export const FormEtapaOrdensServico: React.FC<{
    statusOrdemServico: StatusOrdemServico;
    onSubmitForm: Function;
    fechaForm: Function;
    inputDescricaoEtapaRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {statusOrdemServico, onSubmitForm, fechaForm, inputDescricaoEtapaRef} = props;
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
            onSubmitForm(etapa);
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((msg) => {
                if (msg != '') {
                    enqueueSnackbar(msg, {variant: 'warning'});
                }
            });
        }
    };
    const tipoOS = getTipoOrdemServico(osState.dado, appState.contratos);
    const {inputs, onInputChange, onSubmit} = useFormHook(
        valida,
        novaEtapaOrdemServico(
            osState.dado,
            tipoOS?.etapas && tipoOS.etapas.length > 0 ? tipoOS.etapas[0].numeroDiasUteisDuracao : 10,
        ),
    );
    return (
        <TableRow>
            <TableCell colSpan={6} scope="row" style={{margin: '0px', padding: '0px'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                        <Grid item xs={3}>
                            <CampoTexto
                                fullWidth={true}
                                atributo="descricao"
                                label="Etapa"
                                objetoValor={inputs}
                                somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
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
                                somenteLeitura={
                                    statusOrdemServico == StatusOrdemServico.RASCUNHO ||
                                    statusOrdemServico > StatusOrdemServico.RECEBIDA
                                }
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
                                somenteLeitura={
                                    statusOrdemServico == StatusOrdemServico.RASCUNHO ||
                                    statusOrdemServico > StatusOrdemServico.RECEBIDA
                                }
                                obrigatorio={true}
                                onChange={onInputChange}
                                error={errosInput.dtFimReal != ''}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Confirmar">
                                <IconButton key={`buttonAddEtapa`} size="small" onClick={onSubmit}>
                                    <DoneIcon aria-label="Confirmar" color="primary" fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancelar">
                                <IconButton
                                    key={`buttonClearEtapa`}
                                    size="small"
                                    onClick={() => {
                                        fechaForm();
                                    }}
                                >
                                    <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </TableCell>
        </TableRow>
    );
};
