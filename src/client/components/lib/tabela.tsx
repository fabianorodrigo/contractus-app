import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import React, {ReactNode} from 'react';

export interface TabelaColunaDado {
    atributo: string;
    titulo: string;
    alinhamento?: 'right' | 'left' | 'center';
    funcaoFormatacao?: Function;
    atributoAdicionalFormatacao?: string;
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
                        {colunas.map((c) => {
                            return (
                                <TableCell component="th" scope="row" key={`th${c.titulo}`}>
                                    {c.titulo}
                                </TableCell>
                            );
                        })}
                        {colunasAcao && (
                            <TableCell component="th" scope="row" key={`thAcoes`}>
                                Ações
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dados.map((r, i) => (
                        <TableRow key={`linha${i}`}>
                            {colunas.map((c, j) => {
                                return (
                                    <TableCell scope="row" align={c.alinhamento || 'left'} key={`td_${i}_${j}`}>
                                        {c.funcaoFormatacao
                                            ? c.funcaoFormatacao(
                                                  r[c.atributo],
                                                  c.atributoAdicionalFormatacao
                                                      ? r[c.atributoAdicionalFormatacao]
                                                      : null,
                                              )
                                            : r[c.atributo]}
                                    </TableCell>
                                );
                            })}
                            {colunasAcao && (
                                <TableCell scope="row" key={`tdAcao_${i}`}>
                                    {colunasAcao[i]}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
