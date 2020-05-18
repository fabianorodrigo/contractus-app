import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import 'date-fns';
import React, {Dispatch, FormEvent, useContext} from 'react';
import {EntregavelOrdemServico, OrdemServicoFull} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
export const FormEntregavelOrdemServico: React.FC<{
    entregavelEditado: EntregavelOrdemServico;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitForm: (event: FormEvent<HTMLFormElement> | React.MouseEvent) => void;
    fechaForm: () => void;
    inputDescricaoRef?: React.RefObject<HTMLInputElement>;
    errosInput: any;
}> = (props) => {
    const {entregavelEditado, onInputChange, onSubmitForm, fechaForm, inputDescricaoRef, errosInput} = props;

    if (entregavelEditado == null) return null;
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);

    return (
        <TableRow>
            <TableCell colSpan={3} scope="row" style={{margin: '0px', padding: '0px'}}>
                <Grid container>
                    <Grid item xs={11}>
                        <CampoTexto
                            fullWidth={true}
                            atributo="descricao"
                            label="Entregável"
                            objetoValor={entregavelEditado}
                            somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                            obrigatorio={true}
                            onChange={onInputChange}
                            error={errosInput.descricao != ''}
                            inputRef={inputDescricaoRef}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Confirmar">
                            <IconButton key={`buttonAdd`} size="small" onClick={onSubmitForm}>
                                <DoneIcon aria-label="Confirmar" color="primary" fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar">
                            <IconButton key={`buttonClear`} size="small" onClick={fechaForm}>
                                <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
};
