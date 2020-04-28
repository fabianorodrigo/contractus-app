import {IconButton, TableCell, TableHead, TableRow} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../lib/icons';
export const HeaderEtapasOrdensServico: React.FC<{
    mostraFormEtapa: boolean;
    funcaoMostraForm: Function;
    buttonAdicionaEtapaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraFormEtapa, funcaoMostraForm, buttonAdicionaEtapaRef} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraFormEtapa && (
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
                    )}
                </TableCell>
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
                    Etapa
                </TableCell>
                <TableCell align="center" valign="bottom" component="th" scope="row" key={`thInicioPlan`}>
                    Início
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thFimPlan`}>
                    Fim
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thInicioReal`}>
                    Início
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thFimReal`}>
                    Fim
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
