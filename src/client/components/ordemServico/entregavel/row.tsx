import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {EntregavelOrdemServico, OrdemServicoFull} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {DeleteIcon, EditIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';

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
    funcaoEditar: () => void;
    funcaoRemover: () => void;
}> = (props) => {
    const {entregavel, order, funcaoEditar, funcaoRemover} = props;
    const i = `${entregavel.id}${entregavel.descricao}_${order}`;
    const privateClasses = privateUseStyles();

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);

    return (
        <TableRow
            className={entregavel.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}
        >
            <TableCell colSpan={2} scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px'}}>
                {entregavel.descricao}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                <Tooltip title="Editar Entregável">
                    <IconButton
                        key={`buttonEdit${i}`}
                        aria-label="Editar Entregável"
                        color="primary"
                        size="small"
                        disabled={entregavel.hasOwnProperty('toDelete')}
                        onClick={funcaoEditar}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Entregável">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Entregável"
                            color="primary"
                            size="small"
                            disabled={entregavel.hasOwnProperty('toDelete')}
                            onClick={funcaoRemover}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    );
};
