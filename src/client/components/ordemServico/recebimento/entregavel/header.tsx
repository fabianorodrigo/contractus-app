import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {AddIcon} from '../../../lib/icons';
export const HeaderEntregaveisRecebimentoOrdemServico: React.FC<{
    mostraForm: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoAdicionar, buttonAdicionaRef} = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell valign="bottom" component="th" scope="row" key={`thDescricao`}>
                    {!mostraForm && (
                        <Tooltip title="Adicionar Entregável">
                            <IconButton
                                ref={buttonAdicionaRef}
                                key={`buttonMostraForm`}
                                aria-label="Adicionar Entregável"
                                color="primary"
                                size="small"
                                onClick={funcaoAdicionar}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}{' '}
                    Descrição Entregável
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thLinkEvidencia`}>
                    Link Evidência
                </TableCell>
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
