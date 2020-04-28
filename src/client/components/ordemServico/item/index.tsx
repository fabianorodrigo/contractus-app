import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext, useEffect} from 'react';
import {ItemOrdemServico, OrdemServicoFull} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {getStatusOrdemServico} from '../getStatusOrdemServico';
import {FooterItensOrdensServico} from './footer';
import {FormItemOrdensServico} from './form';
import {HeaderItensOrdensServico} from './header';
import {RowItemOrdemServico} from './row';

export const TabelaItensOrdensServico: React.FC<{
    funcaoAdiciona: Function;
    funcaoRemove: Function;
}> = (props) => {
    const classes = useStyles();
    const refInputDescricaoItem = React.useRef<HTMLInputElement>(null);
    const refButtonAdicionaItem = React.useRef<HTMLInputElement>(null);

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    const {funcaoAdiciona, funcaoRemove} = props;
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const fechaFormItem = () => {
        setMostraFormItem(false);
    };
    const onSubmitItem = (item: ItemOrdemServico) => {
        funcaoAdiciona(item);
        fechaFormItem();
    };

    const [mostraFormItem, setMostraFormItem] = React.useState(false);
    //quando mudar o valor de mostra item, se for para TRUE, foca no campo descrição
    //Se for FALSE e o contrato já estiver selecionado, foca no botão adicionar
    useEffect(() => {
        if (mostraFormItem && refInputDescricaoItem.current != null) {
            refInputDescricaoItem.current.focus();
        } else if (contratos[osState.dado.idContrato] && !mostraFormItem && refButtonAdicionaItem.current != null) {
            refButtonAdicionaItem.current.focus();
        }
    }, [mostraFormItem]);
    let totalPlanejado = 0;
    let totalRealizado = 0;

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Serviços</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderItensOrdensServico
                        mostraFormItem={mostraFormItem}
                        funcaoMostraForm={() => {
                            let msg = null;
                            if (!osState.dado.idContrato || osState.dado.idContrato == -1) {
                                msg = `O contrato para o qual a Ordem de Serviço de serviço está sendo emitida deve ser informado`;
                            } else if (contratos[osState.dado.idContrato].metricas.length == 0) {
                                msg = `O contrato para o qual a Ordem de Serviço está sendo emitida não possui unidades de medidas vigentes`;
                            }
                            msg ? enqueueSnackbar(msg, {variant: 'warning'}) : setMostraFormItem(true);
                        }}
                        buttonAdicionaItemRef={refButtonAdicionaItem}
                    />
                    <TableBody>
                        {osState.dado.itens &&
                            osState.dado.itens.map((itemObj, i) => {
                                const item = itemObj as ItemOrdemServico;
                                if (i == 0) totalPlanejado = totalRealizado = 0;
                                totalPlanejado += item.quantidadeEstimada * item.valorUnitarioEstimado;
                                totalRealizado +=
                                    (item.quantidadeReal || 0) *
                                    (item.valorUnitarioReal || item.valorUnitarioEstimado || 0);
                                return (
                                    <RowItemOrdemServico
                                        item={item}
                                        key={i}
                                        funcaoRemove={funcaoRemove.bind(null, i)}
                                    />
                                );
                            })}
                    </TableBody>
                    <FooterItensOrdensServico totalPlanejado={totalPlanejado} totalRealizado={totalRealizado} />
                </Table>
            </TableContainer>
            {mostraFormItem && (
                <FormItemOrdensServico
                    statusOrdemServico={getStatusOrdemServico(osState.dado)}
                    onSubmitItem={onSubmitItem}
                    fechaFormItem={fechaFormItem}
                    inputDescricaoItemRef={refInputDescricaoItem}
                />
            )}
        </div>
    );
};
