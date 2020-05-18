import DateFnsUtils from '@date-io/date-fns';
import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import React, {Dispatch, FormEvent, useContext} from 'react';
import {EtapaOrdemServico, OrdemServicoFull, TipoOrdemServicoContrato} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';
import {FormCamposPlanejamento} from './formCamposPlanejamento';
import {FormCamposRealizado} from './formCamposRealizado';

export const FormEtapaOrdensServico: React.FC<{
    etapaEditada: EtapaOrdemServico;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitForm: (event: FormEvent<HTMLFormElement> | React.MouseEvent) => void;
    fechaForm: Function;
    inputDescricaoEtapaRef?: React.RefObject<HTMLInputElement>;
    errosInput: any;
}> = (props) => {
    const {etapaEditada, onInputChange, onSubmitForm, fechaForm, inputDescricaoEtapaRef, errosInput} = props;
    if (etapaEditada == null) return null;
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

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
                                objetoValor={etapaEditada}
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
                                inputs={etapaEditada}
                                tipoOrdemServico={tipoOrdemServico as TipoOrdemServicoContrato}
                                statusOrdemServico={statusOrdemServico}
                                onInputChange={onInputChange}
                                errosInput={errosInput}
                            />
                        )}
                        {statusOrdemServico > StatusOrdemServico.RASCUNHO && (
                            <FormCamposRealizado
                                inputs={etapaEditada}
                                tipoOrdemServico={tipoOrdemServico as TipoOrdemServicoContrato}
                                statusOrdemServico={statusOrdemServico}
                                onInputChange={onInputChange}
                                errosInput={errosInput}
                            />
                        )}
                        <Grid item xs={1}>
                            <Tooltip title="Confirmar">
                                <IconButton key={`buttonCOnfirmaEtapa`} size="small" onClick={onSubmitForm}>
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
