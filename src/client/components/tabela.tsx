import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import React, {ReactNode} from 'react';

export interface TabelaColunaDado {
    atributo: string;
    titulo: string;
    alinhamento?: 'right' | 'left' | 'center';
    funcaoFormatacao?: Function;
}

export const Tabela: React.FC<{colunas: TabelaColunaDado[]; dados: Array<any>; colunasAcao?: ReactNode[]}> = ({
    colunas,
    dados,
    colunasAcao,
}) => {
    if (colunasAcao && colunasAcao.length != dados.length)
        throw new Error(`Deve existir uma colunaAcao para cada linha`);
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
                        {colunasAcao && (
                            <TableCell component="th" scope="row">
                                Ações
                            </TableCell>
                        )}
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
                            {colunasAcao && <TableCell scope="row">{colunasAcao[i]}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
