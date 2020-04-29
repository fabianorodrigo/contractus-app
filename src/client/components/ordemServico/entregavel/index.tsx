import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext, useEffect} from 'react';
import {EntregavelOrdemServico, ItemOrdemServico, OrdemServicoFull} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {getStatusOrdemServico} from '../getStatusOrdemServico';
import {FormEntregavelOrdemServico} from './form';
import {HeaderEntregaveisOrdensServico} from './header';
import {RowEntregavelOrdemServico} from './row';

export const TabelaEntregaveisOrdensServico: React.FC<{
    funcaoAdiciona: Function;
    funcaoRemove: Function;
}> = (props) => {
    const refInputDescricao = React.useRef<HTMLInputElement>(null);
    const refButtonAdiciona = React.useRef<HTMLInputElement>(null);

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    const {funcaoAdiciona, funcaoRemove} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const fechaForm = () => {
        setMostraForm(false);
    };
    const onSubmit = (item: ItemOrdemServico) => {
        funcaoAdiciona(item);
        fechaForm();
    };

    const [mostraForm, setMostraForm] = React.useState(false);
    //quando mudar o valor de mostra item, se for para TRUE, foca no campo descrição
    //Se for FALSE e o contrato já estiver selecionado, foca no botão adicionar
    useEffect(() => {
        if (mostraForm && refInputDescricao.current != null) {
            refInputDescricao.current.focus();
        } else if (contratos[osState.dado.idContrato] && !mostraForm && refButtonAdiciona.current != null) {
            refButtonAdiciona.current.focus();
        }
    }, [mostraForm]);

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Entregáveis</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderEntregaveisOrdensServico
                        mostraForm={mostraForm}
                        funcaoMostraForm={() => {
                            setMostraForm(true);
                        }}
                        buttonAdicionaRef={refButtonAdiciona}
                    />
                    <TableBody>
                        {osState.dado.entregaveis &&
                            osState.dado.entregaveis.map((entregavelObj, i) => {
                                const entregavel = entregavelObj as EntregavelOrdemServico;
                                return (
                                    <RowEntregavelOrdemServico
                                        entregavel={entregavel}
                                        key={i}
                                        funcaoRemove={funcaoRemove.bind(null, i)}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {mostraForm && (
                <FormEntregavelOrdemServico
                    statusOrdemServico={getStatusOrdemServico(osState.dado)}
                    onSubmitForm={onSubmit}
                    fechaForm={fechaForm}
                    inputDescricaoRef={refInputDescricao}
                />
            )}
        </div>
    );
};
