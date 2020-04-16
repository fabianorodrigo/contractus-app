import {IconButton, makeStyles, TableCell, TableRow} from '@material-ui/core';
import React from 'react';
import {ItemOrdemServico} from '../../../../models';
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
    funcaoRemove: Function;
}> = (props) => {
    const {item, order, funcaoRemove} = props;
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
                {item.quantidadeEstimada}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdVlrUnitPlan${i}`}>
                {item.valorUnitarioEstimado}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdQtdReal${i}`}>
                {item.quantidadeReal}
            </TableCell>
            <TableCell align="right" scope="row" key={`tdVlrUnitReal${i}`}>
                {item.valorUnitarioReal}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`}>
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
            </TableCell>
        </TableRow>
    );
};
