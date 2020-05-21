import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {formataNumeroStringLocal} from '../../../../commonLib/formatacao';
import {IItemOrdemServico, IOrdemServico} from '../../../../commonLib/interface-models';
import {getStatusOrdemServico} from '../../../../commonLib/interface-models/getStatusOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {StatusOrdemServico} from '../../../../commonLib/interface-models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
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

export const RowItemOrdemServico: React.FC<{
    item: IItemOrdemServico;
    order?: number;
    funcaoEditar: () => void;
    funcaoRemover: () => void;
}> = (props) => {
    const {item, order, funcaoEditar, funcaoRemover} = props;
    const i = `${item.id}${item.descricao}_${order}`;

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);

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
                <Tooltip title="Editar Item">
                    <IconButton
                        key={`buttonEdit${i}`}
                        aria-label="Editar Item"
                        color="primary"
                        size="small"
                        disabled={item.hasOwnProperty('toDelete')}
                        onClick={funcaoEditar}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Item">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Item"
                            color="primary"
                            size="small"
                            disabled={item.hasOwnProperty('toDelete')}
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
