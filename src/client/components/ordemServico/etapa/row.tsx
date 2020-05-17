import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {formataDataStringLocal, formataNumeroStringLocal} from '../../../../commonLib/formatacao';
import {EtapaOrdemServico, OrdemServicoFull} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {DeleteIcon, EditIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';

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
    funcaoEditar: () => void;
    order?: number;
    funcaoRemover: () => void;
}> = (props) => {
    const {etapa, funcaoEditar, order, funcaoRemover} = props;
    const i = `${etapa.id}${etapa.descricao}_${order}`;
    const privateClasses = privateUseStyles();

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

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
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <TableCell align="center" scope="row" key={`tdVlAdiantamentoPlan${i}`}>
                    {formataNumeroStringLocal(etapa.valorAdiantamentoPlanejado || 0, true)}
                </TableCell>
            )}
            <TableCell align="center" scope="row" key={`tdDtIniReal${i}`}>
                {formataDataStringLocal(etapa.dtInicioReal)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtFimReal${i}`}>
                {formataDataStringLocal(etapa.dtFimReal)}
            </TableCell>
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <TableCell align="center" scope="row" key={`tdVlAdiantamentoReal${i}`}>
                    {etapa.valorAdiantamentoReal
                        ? formataNumeroStringLocal(etapa.valorAdiantamentoPlanejado || 0, true)
                        : ''}
                </TableCell>
            )}
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                <Tooltip title="Editar Etapa">
                    <IconButton
                        key={`buttonEdit${i}`}
                        aria-label="Editar Etapa"
                        color="primary"
                        size="small"
                        disabled={etapa.hasOwnProperty('toDelete')}
                        onClick={funcaoEditar}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {statusOrdemServico == StatusOrdemServico.RASCUNHO && (
                    <Tooltip title="Remover Etapa">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Etapa"
                            color="primary"
                            size="small"
                            disabled={etapa.hasOwnProperty('toDelete')}
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
