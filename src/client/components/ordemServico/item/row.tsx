import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {ItemOrdemServico} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {formataNumeroStringLocal} from '../../../services/formatacao';
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

export const RowItemOrdemServico: React.FC<{
    item: ItemOrdemServico;
    order?: number;
    statusOrdemServico: StatusOrdemServico;
    funcaoRemove: Function;
}> = (props) => {
    const {item, order, statusOrdemServico, funcaoRemove} = props;
    const i = `${item.id}${item.descricao}_${order}`;
    const privateClasses = privateUseStyles();
    return (
        <TableRow className={item.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}>
            <TableCell scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px', minWidth: '300px'}}>
                {item.descricao}
            </TableCell>
            <TableCell scope="row" key={`tdUnidade${i}`}>
                {item.siglaMetrica}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdQtdPlan${i}`}>
                {formataNumeroStringLocal(item.quantidadeEstimada, false)}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdVlrUnitPlan${i}`}>
                {formataNumeroStringLocal(item.valorUnitarioEstimado, true)}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdQtdReal${i}`}>
                {item.quantidadeReal ? formataNumeroStringLocal(item.quantidadeReal, false) : item.quantidadeReal}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdVlrUnitReal${i}`}>
                {item.valorUnitarioReal
                    ? formataNumeroStringLocal(item.valorUnitarioReal, true)
                    : item.valorUnitarioReal}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Item">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Item"
                            color="primary"
                            size="small"
                            disabled={item.hasOwnProperty('toDelete')}
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
