import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {EntregavelOrdemServico} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {DeleteIcon} from '../../lib/icons';

const privateUseStyles = makeStyles((theme) => ({
    deleted: {
        textDecoration: 'line-through',
        color: 'danger',
    },
    notDeleted: {
        textDecoration: 'normal',
    },
}));

export const RowEntregavelOrdemServico: React.FC<{
    entregavel: EntregavelOrdemServico;
    order?: number;
    statusOrdemServico: StatusOrdemServico;
    funcaoRemove: Function;
}> = (props) => {
    const {entregavel, order, statusOrdemServico, funcaoRemove} = props;
    const i = `${entregavel.id}${entregavel.descricao}_${order}`;
    const privateClasses = privateUseStyles();
    return (
        <TableRow
            className={entregavel.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}
        >
            <TableCell colSpan={2} scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px'}}>
                {entregavel.descricao}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdIniPlan${i}`}>
                {entregavel.linkEvidencia}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Entregável">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Entregável"
                            color="primary"
                            size="small"
                            disabled={entregavel.hasOwnProperty('toDelete')}
                        >
                            <DeleteIcon
                                fontSize="small"
                                onClick={() => {
                                    funcaoRemove();
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    );
};
