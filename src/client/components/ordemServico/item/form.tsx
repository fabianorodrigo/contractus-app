import {Grid, IconButton, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, FormEvent, useContext} from 'react';
import {IOrdemServico} from '../../../../commonLib/interface-models';
import {getStatusOrdemServico} from '../../../../commonLib/interface-models/getStatusOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {StatusOrdemServico} from '../../../../commonLib/interface-models/StatusOrdemServico';
import {ItemOrdemServico} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import useStyles from '../../../services/styles';
import {CampoLista} from '../../lib/campoLista';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';

export const FormItemOrdensServico: React.FC<{
    itemEditado: ItemOrdemServico;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitForm: (event: FormEvent<HTMLFormElement> | React.MouseEvent) => void;
    fechaForm: () => void;
    inputDescricaoItemRef?: React.RefObject<HTMLInputElement>;
    errosInput: any;
}> = (props) => {
    const {itemEditado, onInputChange, onSubmitForm, fechaForm, inputDescricaoItemRef, errosInput} = props;
    if (itemEditado == null) return null;

    const classes = useStyles();
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);

    return (
        <TableRow>
            <TableCell colSpan={7} scope="row" style={{margin: '0px', padding: '0px'}}>
                <Grid container>
                    <Grid item xs={12}>
                        <CampoTexto
                            className={classes.innerTableFullWidth}
                            atributo="descricao"
                            label="Descrição"
                            objetoValor={itemEditado}
                            somenteLeitura={statusOrdemServico > statusOrdemServico}
                            obrigatorio={true}
                            onChange={onInputChange}
                            error={errosInput.descricao != ''}
                            inputRef={inputDescricaoItemRef}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CampoTexto
                            atributo="idProduto"
                            label="Produto"
                            objetoValor={itemEditado}
                            fullWidth={true}
                            somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                            obrigatorio={false}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <CampoLista
                            atributo="siglaMetrica"
                            label="Unidade"
                            objetoValor={itemEditado}
                            somenteLeitura={osState.dado.numeroDocumentoOrdemServicoSEI != null}
                            obrigatorio={true}
                            onChange={onInputChange}
                            defaultValue={
                                contratos[osState.dado.idContrato] &&
                                contratos[osState.dado.idContrato].metricas.length > 0
                                    ? contratos[osState.dado.idContrato].metricas[0].sigla
                                    : ''
                            }
                            error={errosInput.siglaMetrica != ''}
                            opcoes={
                                contratos[osState.dado.idContrato] && contratos[osState.dado.idContrato].metricas
                                    ? contratos[osState.dado.idContrato].metricas.map((metrica) => {
                                          return {
                                              valor: metrica.sigla,
                                              label: metrica.sigla,
                                          };
                                      })
                                    : []
                            }
                        ></CampoLista>
                    </Grid>
                    <Grid item xs={1}>
                        <CampoTexto
                            fullWidth={true}
                            atributo="quantidadeEstimada"
                            label="Quantidade"
                            objetoValor={itemEditado}
                            somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                            obrigatorio={true}
                            onChange={onInputChange}
                            type="number"
                            error={errosInput.quantidadeEstimada != ''}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CampoTexto
                            fullWidth={true}
                            atributo="valorUnitarioEstimado"
                            label="Valor Unitário"
                            objetoValor={itemEditado}
                            somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                            obrigatorio={true}
                            onChange={onInputChange}
                            type="number"
                            error={errosInput.valorUnitarioEstimado != ''}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <CampoTexto
                            fullWidth={true}
                            atributo="quantidadeReal"
                            label="Qtd Real"
                            objetoValor={itemEditado}
                            somenteLeitura={
                                statusOrdemServico == StatusOrdemServico.RASCUNHO ||
                                statusOrdemServico > StatusOrdemServico.RECEBIDA
                            }
                            obrigatorio={true}
                            onChange={onInputChange}
                            type="number"
                            error={errosInput.quantidadeReal != ''}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CampoTexto
                            fullWidth={true}
                            atributo="valorUnitarioReal"
                            label="Valor Unitário Real"
                            objetoValor={itemEditado}
                            somenteLeitura={
                                statusOrdemServico == StatusOrdemServico.RASCUNHO ||
                                statusOrdemServico > StatusOrdemServico.RECEBIDA
                            }
                            obrigatorio={true}
                            onChange={onInputChange}
                            type="number"
                            error={errosInput.valorUnitarioReal != ''}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Confirmar">
                            <IconButton key={`buttonAddItem`} size="small" onClick={onSubmitForm}>
                                <DoneIcon aria-label="Confirmar" color="primary" fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar">
                            <IconButton key={`buttonClearItem`} size="small" onClick={fechaForm}>
                                <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
};
