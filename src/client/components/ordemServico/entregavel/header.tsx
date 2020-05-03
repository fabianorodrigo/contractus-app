import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../lib/icons';
export const HeaderEntregaveisOrdensServico: React.FC<{
    mostraForm: boolean;
    funcaoMostraForm: Function;
    buttonAdicionaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoMostraForm, buttonAdicionaRef} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    {!mostraForm && (
                        <Tooltip title="Adicionar Entregável">
                            <IconButton
                                ref={buttonAdicionaRef}
                                key={`buttonMostraForm`}
                                aria-label="Adicionar Entregável"
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
                <TableCell valign="bottom" component="th" scope="row" key={`thDescricao`}>
                    Descrição Entregável
                </TableCell>
                <TableCell align="center" valign="bottom" component="th" scope="row" key={`thInicioPlan`}>
                    Link Evidência
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
