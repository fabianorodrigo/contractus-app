import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {OrdemServicoFull} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {AddIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';
export const HeaderEtapasOrdensServico: React.FC<{
    mostraFormEtapa: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaEtapaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraFormEtapa, funcaoAdicionar: funcaoMostraForm, buttonAdicionaEtapaRef} = props;

    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraFormEtapa && (
                        <Tooltip title="Adicionar Etapa">
                            <IconButton
                                ref={buttonAdicionaEtapaRef}
                                key={`buttonMostraFormEtapa`}
                                aria-label="Adicionar Etapa"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    funcaoMostraForm();
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </TableCell>
                <TableCell
                    component="th"
                    align="center"
                    scope="row"
                    key={`thPlanejamento`}
                    colSpan={tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa ? 3 : 2}
                >
                    Planejamento
                </TableCell>
                <TableCell
                    component="th"
                    align="center"
                    scope="row"
                    key={`thRealizado`}
                    colSpan={tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa ? 3 : 2}
                >
                    Realizado
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell valign="bottom" component="th" scope="row" key={`thDescricao`}>
                    Etapa
                </TableCell>
                <TableCell align="center" valign="bottom" component="th" scope="row" key={`thInicioPlan`}>
                    Início
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thFimPlan`}>
                    Fim
                </TableCell>
                {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                    <TableCell align="center" component="th" scope="row" key={`thVlAdiantamentoPlan`}>
                        Valor
                    </TableCell>
                )}
                <TableCell align="center" component="th" scope="row" key={`thInicioReal`}>
                    Início
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thFimReal`}>
                    Fim
                </TableCell>
                {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                    <TableCell align="center" component="th" scope="row" key={`thVlAdiantamentoReal`}>
                        Valor
                    </TableCell>
                )}
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
