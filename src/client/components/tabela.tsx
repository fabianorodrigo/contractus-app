import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import React from 'react';
import useStyles from '../services/styles';

export interface TabelaColuna {
    atributo: string;
    titulo: string;
    alinhamento?: 'right' | 'left' | 'center';
    funcaoFormatacao?: Function;
}

export const Tabela: React.FC<{colunas: TabelaColuna[]; dados: Array<any>}> = ({colunas, dados}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {colunas.map(c => {
                            return (
                                <TableCell component="th" scope="row">
                                    {c.titulo}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dados.map((r, i) => (
                        <TableRow key={`linha${i}`}>
                            {colunas.map(c => {
                                return (
                                    <TableCell scope="row" align={c.alinhamento || 'left'}>
                                        {c.funcaoFormatacao ? c.funcaoFormatacao(r[c.atributo]) : r[c.atributo]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
