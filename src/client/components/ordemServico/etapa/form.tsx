import DateFnsUtils from '@date-io/date-fns';
import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {EtapaOrdemServico, OrdemServicoFull, TipoOrdemServicoContrato} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {validaDataInicioMenorIgualDataFim} from '../../lib/validaDataInicioDataFim';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';
import {FormCamposPlanejamento} from './formCamposPlanejamento';
import {FormCamposRealizado} from './formCamposRealizado';

export const FormEtapaOrdensServico: React.FC<{
    etapaEditada: EtapaOrdemServico;
    onSubmitForm: (etapa: EtapaOrdemServico, indice?: number) => void;
    fechaForm: Function;
    inputDescricaoEtapaRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {etapaEditada, onSubmitForm, fechaForm, inputDescricaoEtapaRef} = props;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        dtInicioPlanejada: '',
        dtFimPlanejada: '',
        dtInicioReal: '',
        dtFimReal: '',
        valorAdiantamentoPlanejado: '',
        valorAdiantamentoReal: '',
    });
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const valida = (etapa: EtapaOrdemServico, indice?: number) => {
        errosInput.descricao =
            etapa.descricao == null || etapa.descricao.trim() == ''
                ? 'Uma descrição da etapa de execução dos serviços deve ser informada'
                : '';

        //planejamento
        errosInput.dtInicioPlanejada =
            etapa.dtInicioPlanejada == null ? 'A data planejada para início da etapa deve ser informada' : '';
        errosInput.dtFimPlanejada =
            etapa.dtFimPlanejada == null ? 'A data prevista para conclusão da etapa deve ser informada' : '';
        errosInput.dtFimPlanejada =
            etapa.dtInicioPlanejada != null &&
            etapa.dtFimPlanejada != null &&
            !validaDataInicioMenorIgualDataFim(etapa.dtInicioPlanejada, etapa.dtFimPlanejada)
                ? 'A data prevista para conclusão da etapa dever ser posterior à data de início'
                : '';

        //realizado
        if (etapa.dtInicioReal != null || etapa.dtFimReal != null) {
            errosInput.dtInicioReal = etapa.dtInicioReal == null ? 'A data de início da etapa deve ser informado' : '';
            errosInput.dtFimReal =
                etapa.dtInicioReal != null &&
                etapa.dtFimReal != null &&
                !validaDataInicioMenorIgualDataFim(etapa.dtInicioReal, etapa.dtFimReal)
                    ? 'A data de conclusão da etapa dever ser posterior à data de início'
                    : '';
        }

        if (Object.values(errosInput).every((v) => v == '')) {
            onSubmitForm(etapa, indice);
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((msg) => {
                if (msg != '') {
                    enqueueSnackbar(msg, {variant: 'warning'});
                }
            });
        }
    };
    const {inputs, onInputChange, onSubmit} = useFormHook(valida, etapaEditada);
    return (
        <TableRow>
            <TableCell
                colSpan={tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa ? 9 : 7}
                scope="row"
                style={{margin: '0px', padding: '0px'}}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                        <Grid item xs={tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa ? 3 : 5}>
                            <CampoTexto
                                fullWidth={true}
                                atributo="descricao"
                                label="Etapa"
                                objetoValor={inputs}
                                somenteLeitura={
                                    statusOrdemServico > StatusOrdemServico.RASCUNHO && etapaEditada.id != undefined
                                }
                                obrigatorio={true}
                                onChange={onInputChange}
                                error={errosInput.descricao != ''}
                                inputRef={inputDescricaoEtapaRef}
                            />
                        </Grid>
                        {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                            <FormCamposPlanejamento
                                inputs={inputs}
                                tipoOrdemServico={tipoOrdemServico as TipoOrdemServicoContrato}
                                statusOrdemServico={statusOrdemServico}
                                onInputChange={onInputChange}
                                errosInput={errosInput}
                            />
                        )}
                        {statusOrdemServico > StatusOrdemServico.RASCUNHO && (
                            <FormCamposRealizado
                                inputs={inputs}
                                tipoOrdemServico={tipoOrdemServico as TipoOrdemServicoContrato}
                                statusOrdemServico={statusOrdemServico}
                                onInputChange={onInputChange}
                                errosInput={errosInput}
                            />
                        )}
                        <Grid item xs={1}>
                            <Tooltip title="Confirmar">
                                <IconButton key={`buttonCOnfirmaEtapa`} size="small" onClick={onSubmit}>
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
