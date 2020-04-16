import {TableCell, TableFooter, TableRow} from '@material-ui/core';
import React from 'react';
import {formataNumeroStringLocal} from '../../../services/formatacao';
export const FooterItensOrdensServico: React.FC<{
    totalPlanejado: number;
    totalRealizado: number;
}> = (props) => {
    const {totalPlanejado, totalRealizado} = props;

    return (
        <TableFooter>
            <TableRow>
                <TableCell scope="row">
                    <b>Total</b>
                </TableCell>
                <TableCell align="right" colSpan={2}>
                    Planejado:
                </TableCell>
                <TableCell scope="row" align="right">
                    {formataNumeroStringLocal(totalPlanejado, true)}
                </TableCell>
                <TableCell scope="row" align="right">
                    Realizado:
                </TableCell>
                <TableCell scope="row" align="right">
                    {formataNumeroStringLocal(totalRealizado, true)}
                </TableCell>
                <TableCell scope="row"></TableCell>
            </TableRow>
        </TableFooter>
    );
};
