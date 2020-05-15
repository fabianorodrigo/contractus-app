import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React from 'react';
import {formataDataStringLocal} from '../../../../commonLib/formatacao';
import {EtapaOrdemServico} from '../../../../models';
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

export const RowEtapaOrdemServico: React.FC<{
    etapa: EtapaOrdemServico;
    order?: number;
    statusOrdemServico: StatusOrdemServico;
    funcaoRemove: Function;
}> = (props) => {
    const {etapa, order, statusOrdemServico, funcaoRemove} = props;
    const i = `${etapa.id}${etapa.descricao}_${order}`;
    const privateClasses = privateUseStyles();
    return (
        <TableRow className={etapa.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}>
            <TableCell scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px', minWidth: '300px'}}>
                {etapa.descricao}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdIniPlan${i}`}>
                {formataDataStringLocal(etapa.dtInicioPlanejada)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtFimPlan${i}`}>
                {formataDataStringLocal(etapa.dtFimPlanejada)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtIniReal${i}`}>
                {formataDataStringLocal(etapa.dtInicioReal)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtFimReal${i}`}>
                {formataDataStringLocal(etapa.dtFimReal)}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Etapa">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Etapa"
                            color="primary"
                            size="small"
                            disabled={etapa.hasOwnProperty('toDelete')}
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
