import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../lib/icons';
export const HeaderItensOrdensServico: React.FC<{
    mostraForm: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoAdicionar, buttonAdicionaRef} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraForm && (
                        <Tooltip title="Adicionar Item de Serviço">
                            <IconButton
                                ref={buttonAdicionaRef}
                                key={`buttonMostraFormItem`}
                                aria-label="Adicionar Item"
                                color="primary"
                                size="small"
                                onClick={funcaoAdicionar}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </TableCell>
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
                    Descrição
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thUnidade`}>
                    Unidade
                </TableCell>
                <TableCell component="th" scope="row" align="right" key={`thQtdPlan`}>
                    Quantidade
                </TableCell>
                <TableCell component="th" scope="row" align="right" key={`thValorPlan`}>
                    Vl.Unitário
                </TableCell>
                <TableCell component="th" scope="row" align="right" key={`thQtdReal`}>
                    Quantidade
                </TableCell>
                <TableCell component="th" scope="row" align="right" key={`thValorReal`}>
                    Vl.Unitário
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
