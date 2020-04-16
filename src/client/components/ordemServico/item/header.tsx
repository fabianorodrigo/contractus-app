import {IconButton, TableCell, TableHead, TableRow} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../lib/icons';
export const HeaderItensOrdensServico: React.FC<{
    mostraFormItem: boolean;
    funcaoMostraForm: Function;
}> = (props) => {
    const {mostraFormItem, funcaoMostraForm} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraFormItem && (
                        <IconButton
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
                <TableCell component="th" scope="row" align="right" key={`thQtdPlan`} rowSpan={2}>
                    Quantidade
                </TableCell>
                <TableCell component="th" scope="row" align="right" key={`thValorPlan`} rowSpan={2}>
                    Vl.Unitário
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
    );
};
