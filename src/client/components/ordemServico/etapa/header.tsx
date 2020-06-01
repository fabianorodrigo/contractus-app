import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {IOrdemServico} from '../../../../commonLib/interface-models';
import {getTipoOrdemServico} from '../../../../commonLib/interface-models/getTipoOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {AddIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../contextOrdemServico';
export const HeaderEtapasOrdensServico: React.FC<{
    mostraForm: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaEtapaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoAdicionar, buttonAdicionaEtapaRef} = props;

    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraForm && (
                        <Tooltip title="Adicionar Etapa">
                            <IconButton
                                ref={buttonAdicionaEtapaRef}
                                key={`buttonMostraFormEtapa`}
                                aria-label="Adicionar Etapa"
                                color="primary"
                                size="small"
                                onClick={funcaoAdicionar}
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
