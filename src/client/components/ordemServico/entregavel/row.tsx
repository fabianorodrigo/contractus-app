import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React, {useContext} from 'react';
import {getAcoesEntregavelOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {IEntregavelOrdemServico, IOrdemServico} from '../../../../commonLib/interface-models';
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

export const RowEntregavelOrdemServico: React.FC<{
    entregavel: IEntregavelOrdemServico;
    order?: number;
    funcaoEditar: () => void;
    funcaoRemover: () => void;
}> = (props) => {
    const {entregavel, order, funcaoEditar, funcaoRemover} = props;
    const i = `${entregavel.id}${entregavel.descricao}_${order}`;
    const privateClasses = privateUseStyles();

    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);

    //Habilitação de ações
    const pode = getAcoesEntregavelOrdemServico(TipoUsoPermissoes.HABILITAR_UI, entregavel, osState.dado);

    return (
        <TableRow
            className={entregavel.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}
        >
            <TableCell scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px'}}>
                {entregavel.descricao}
            </TableCell>
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                {pode.editar().ok && (
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
                )}
                {pode.remover().ok && (
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
