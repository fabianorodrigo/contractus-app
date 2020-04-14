import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {ItemOrdemServico, OrdemServico} from '../../../models';
import {AppContext, AppContextStoreType} from '../../App-Context';
import {useFormHook} from '../../customHooks/useForm';
import {ContratosMap} from '../../models/TypeContext';
import useStyles from '../../services/styles';
import {CampoLista} from '../lib/campoLista';
import {CampoTextoTabela} from '../lib/campoTextoTabela';
import {AddIcon, DeleteIcon} from '../lib/icons';

export const TabelaItensOrdensServico: React.FC<{
    ordemServico: OrdemServico;
    funcaoAdiciona: Function;
    funcaoRemove: Function;
}> = (props) => {
    const {ordemServico, funcaoAdiciona, funcaoRemove} = props;
    const classes = useStyles();
    //Buscando dados
    const {state}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = state.contratos;
    let itemVazio = {
        idOrdemServico: ordemServico.id,
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
    };

    const onSubmitItem = (item: ItemOrdemServico) => {
        funcaoAdiciona(item);
        inputs.descricao = '';
        inputs.siglaMetrica = '';
        inputs.quantidadeEstimada = '';
        inputs.valorUnitarioEstimado = '';
    };
    const {inputs, onInputChange, onSubmit} = useFormHook(onSubmitItem, itemVazio);

    return (
        <TableContainer component={Paper}>
            <Table size="small" className={classes.tableInForm}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell component="th" align="center" scope="row" key={`thPlanejamento`} colSpan={2}>
                            Planejamento
                        </TableCell>
                        <TableCell component="th" align="center" scope="row" key={`thRealizado`} colSpan={2}>
                            Realizado
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell valign="bottom" component="th" scope="row" key={`thDescricao`}>
                            Descrição*
                        </TableCell>
                        <TableCell valign="bottom" component="th" scope="row" key={`thUnidade`}>
                            Unidade*
                        </TableCell>
                        <TableCell component="th" scope="row" align="right" key={`thQtdPlan`} rowSpan={2}>
                            Quantidade*
                        </TableCell>
                        <TableCell component="th" scope="row" align="right" key={`thValorPlan`} rowSpan={2}>
                            Vl.Unitário*
                        </TableCell>
                        <TableCell component="th" scope="row" align="right" key={`thQtdReal`} rowSpan={2}>
                            Quantidade
                        </TableCell>
                        <TableCell component="th" scope="row" align="right" key={`thValorReal`} rowSpan={2}>
                            Vl.Unitário
                        </TableCell>
                        <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`}>
                            Ações
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordemServico.itens &&
                        ordemServico.itens.map((item, i) => (
                            <TableRow key={`linha${i}`}>
                                <TableCell
                                    scope="row"
                                    key={`tdDescricao${i}`}
                                    style={{paddingBottom: '0px', minWidth: '300px'}}
                                >
                                    {item.descricao}
                                </TableCell>
                                <TableCell scope="row" key={`tdUnidade${i}`}>
                                    {item.siglaMetrica}
                                </TableCell>
                                <TableCell align="right" scope="row" key={`tdQtdPlan${i}`}>
                                    {item.quantidadeEstimada}
                                </TableCell>
                                <TableCell align="right" scope="row" key={`tdVlrUnitPlan${i}`}>
                                    {item.valorUnitarioEstimado}
                                </TableCell>
                                <TableCell align="right" scope="row" key={`tdQtdReal${i}`}>
                                    {item.quantidadeReal}
                                </TableCell>
                                <TableCell align="right" scope="row" key={`tdVlrUnitReal${i}`}>
                                    {item.valorUnitarioReal}
                                </TableCell>
                                <TableCell scope="row" key={`tdAcoes${i}`}>
                                    <IconButton
                                        key={`buttonRemove${i}`}
                                        aria-label="Remover Item"
                                        color="secondary"
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" onClick={funcaoRemove.bind(null, i)} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell scope="row" key={`tdNewDescricao`} style={{paddingBottom: '0px'}}>
                            <CampoTextoTabela
                                atributo="descricao"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                helperText={'errosItem.descricao'}
                            />
                        </TableCell>
                        <TableCell scope="row" key={`tdNewUnidade`}>
                            <CampoLista
                                atributo="siglaMetrica"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                opcoes={Object.values(contratos[ordemServico.idContrato].metricas).map((metrica) => {
                                    return {
                                        valor: metrica.sigla,
                                        label: metrica.sigla,
                                    };
                                })}
                            ></CampoLista>
                        </TableCell>
                        <TableCell align="right" scope="row" key={`tdNewQtdPlan`}>
                            <CampoTextoTabela
                                atributo="quantidadeEstimada"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="right" scope="row" key={`tdNewVlrUnitPlan`}>
                            <CampoTextoTabela
                                atributo="valorUnitarioEstimado"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="right" scope="row" key={`tdNewQtdReal`}>
                            <CampoTextoTabela
                                atributo="quantidadeReal"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                type="number"
                            />
                        </TableCell>
                        <TableCell align="right" scope="row" key={`tdNewVlrUnitReal`}>
                            <CampoTextoTabela
                                atributo="valorUnitarioReal"
                                label={''}
                                objetoValor={inputs}
                                somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                obrigatorio={true}
                                onChange={onInputChange}
                                type="number"
                            />
                        </TableCell>
                        <TableCell scope="row" key={`tdNewAcoes`}>
                            <IconButton
                                key={`buttonAddItem`}
                                aria-label="Adicionar Item"
                                color="secondary"
                                size="small"
                            >
                                <AddIcon fontSize="small" onClick={onSubmit} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
