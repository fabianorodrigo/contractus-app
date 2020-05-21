import DateFnsUtils from '@date-io/date-fns';
import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import React, {Dispatch, FormEvent, useContext} from 'react';
import {getAcoesEtapaOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {IEtapaOrdemServico, IOrdemServico, ITipoOrdemServicoContrato} from '../../../../commonLib/interface-models';
import {getStatusOrdemServico} from '../../../../commonLib/interface-models/getStatusOrdemServico';
import {getTipoOrdemServico} from '../../../../commonLib/interface-models/getTipoOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {FormCamposPlanejamento} from './formCamposPlanejamento';
import {FormCamposRealizado} from './formCamposRealizado';

export const FormEtapaOrdensServico: React.FC<{
    etapaEditada: IEtapaOrdemServico;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitForm: (event: FormEvent<HTMLFormElement> | React.MouseEvent) => void;
    fechaForm: Function;
    inputDescricaoEtapaRef?: React.RefObject<HTMLInputElement>;
    errosInput: {[atributo: string]: boolean};
}> = (props) => {
    const {etapaEditada, onInputChange, onSubmitForm, fechaForm, inputDescricaoEtapaRef, errosInput} = props;
    if (etapaEditada == null) return null;
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    //Habilitação de ações
    const pode = getAcoesEtapaOrdemServico(TipoUsoPermissoes.HABILITAR_UI, etapaEditada, osState.dado);

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
                                somenteLeitura={pode.editarDescricao().ok}
                                obrigatorio={true}
                                onChange={onInputChange}
                                error={errosInput.descricao}
                                inputRef={inputDescricaoEtapaRef}
                            />
                        </Grid>
                        {pode.editarPlanejamento().ok && (
                            <FormCamposPlanejamento
                                inputs={etapaEditada}
                                tipoOrdemServico={tipoOrdemServico as ITipoOrdemServicoContrato}
                                statusOrdemServico={statusOrdemServico}
                                onInputChange={onInputChange}
                                errosInput={errosInput}
                            />
                        )}
                        {pode.editarRealizado().ok && (
                            <FormCamposRealizado
                                inputs={etapaEditada}
                                tipoOrdemServico={tipoOrdemServico as ITipoOrdemServicoContrato}
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
