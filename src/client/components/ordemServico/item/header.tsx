import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../lib/icons';
export const HeaderItensOrdensServico: React.FC<{
    mostraFormItem: boolean;
    funcaoMostraForm: Function;
    buttonAdicionaItemRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraFormItem, funcaoMostraForm, buttonAdicionaItemRef} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraFormItem && (
                        <Tooltip title="Adicionar Item de Serviço">
                            <IconButton
                                ref={buttonAdicionaItemRef}
                                key={`buttonMostraFormItem`}
                                aria-label="Adicionar Item"
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
