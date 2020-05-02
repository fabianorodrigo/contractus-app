import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext, useEffect} from 'react';
import {EtapaOrdemServico, ItemOrdemServico, OrdemServicoFull} from '../../../../models';
import {getStatusOrdemServico} from '../../../../models/getStatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {FormEtapaOrdensServico} from './form';
import {HeaderEtapasOrdensServico} from './header';
import {RowEtapaOrdemServico} from './row';

export const TabelaEtapasOrdensServico: React.FC<{
    funcaoAdiciona: Function;
    funcaoRemove: Function;
}> = (props) => {
    const refInputDescricaoEtapa = React.useRef<HTMLInputElement>(null);
    const refButtonAdicionaEtapa = React.useRef<HTMLInputElement>(null);

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
        setMostraFormEtapa(false);
    };
    const onSubmit = (item: ItemOrdemServico) => {
        funcaoAdiciona(item);
        fechaForm();
    };

    const [mostraFormEtapa, setMostraFormEtapa] = React.useState(false);
    //quando mudar o valor de mostra item, se for para TRUE, foca no campo descrição
    //Se for FALSE e o contrato já estiver selecionado, foca no botão adicionar
    useEffect(() => {
        if (mostraFormEtapa && refInputDescricaoEtapa.current != null) {
            refInputDescricaoEtapa.current.focus();
        } else if (contratos[osState.dado.idContrato] && !mostraFormEtapa && refButtonAdicionaEtapa.current != null) {
            refButtonAdicionaEtapa.current.focus();
        }
    }, [mostraFormEtapa]);

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Cronograma de Etapas</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderEtapasOrdensServico
                        mostraFormEtapa={mostraFormEtapa}
                        funcaoMostraForm={() => {
                            setMostraFormEtapa(true);
                        }}
                        buttonAdicionaEtapaRef={refButtonAdicionaEtapa}
                    />
                    <TableBody>
                        {osState.dado.etapas &&
                            osState.dado.etapas.map((etapaObj, i) => {
                                const etapa = etapaObj as EtapaOrdemServico;
                                return (
                                    <RowEtapaOrdemServico
                                        etapa={etapa}
                                        key={i}
                                        funcaoRemove={funcaoRemove.bind(null, i)}
                                    />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {mostraFormEtapa && (
                <FormEtapaOrdensServico
                    statusOrdemServico={getStatusOrdemServico(osState.dado)}
                    onSubmitForm={onSubmit}
                    fechaForm={fechaForm}
                    inputDescricaoEtapaRef={refInputDescricaoEtapa}
                />
            )}
        </div>
    );
};
