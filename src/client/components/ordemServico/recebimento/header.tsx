import {TableCell, TableHead, TableRow} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {IOrdemServico} from '../../../../commonLib/interface-models';
import {getTipoOrdemServico} from '../../../../commonLib/interface-models/getTipoOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {OrdemServicoContext} from '../contextOrdemServico';
export const HeaderRecebimentosOrdensServico: React.FC<{
    mostraForm: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoAdicionar, buttonAdicionaRef} = props;

    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    return (
        <TableHead>
            <TableRow>
                <TableCell valign="bottom" component="th" scope="row" key={`thTipo`}>
                    Tipo
                </TableCell>
                <TableCell align="center" valign="bottom" component="th" scope="row" key={`thDtRecebimento`}>
                    Data Recebimento
                </TableCell>
                <TableCell align="center" component="th" scope="row" key={`thItens`}>
                    Itens Recebidos
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
