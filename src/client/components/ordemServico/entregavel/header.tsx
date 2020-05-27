import {IconButton, TableCell, TableHead, TableRow, Tooltip} from '@material-ui/core';
import React, {useContext} from 'react';
import {getAcoesOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {IOrdemServico} from '../../../../commonLib/interface-models';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {AddIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
export const HeaderEntregaveisOrdensServico: React.FC<{
    mostraForm: boolean;
    funcaoAdicionar: () => void;
    buttonAdicionaRef?: React.RefObject<any>;
}> = (props) => {
    const {mostraForm, funcaoAdicionar, buttonAdicionaRef} = props;

    //Habilitação de ações
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const pode = getAcoesOrdemServico(TipoUsoPermissoes.HABILITAR_UI, osState.dado);

    return (
        <TableHead>
            <TableRow>
                <TableCell valign="bottom" component="th" scope="row" key={`thDescricao`}>
                    {!mostraForm && pode.adicionarEntregavel().ok && (
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
                <TableCell valign="bottom" component="th" scope="row" key={`thAcoes`} align="right">
                    Ações
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
