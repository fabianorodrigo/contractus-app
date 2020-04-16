import {TableCell, TableFooter, TableRow} from '@material-ui/core';
import React from 'react';
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
                <TableCell scope="row">{totalPlanejado}</TableCell>
                <TableCell scope="row" align="right">
                    Realizado:
                </TableCell>
                <TableCell scope="row">{totalRealizado}</TableCell>
                <TableCell scope="row"></TableCell>
            </TableRow>
        </TableFooter>
    );
};
