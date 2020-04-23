import {Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React from 'react';
import {ItemOrdemServico, MetricaContrato, OrdemServico} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import useStyles from '../../../services/styles';
import {FooterItensOrdensServico} from './footer';
import {FormItemOrdensServico} from './form';
import {HeaderItensOrdensServico} from './header';
import {RowItemOrdemServico} from './row';

export const TabelaItensOrdensServico: React.FC<{
    ordemServico: OrdemServico;
    metricasContrato: MetricaContrato[];
    funcaoAdiciona: Function;
    funcaoRemove: Function;
}> = (props) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const {ordemServico, metricasContrato, funcaoAdiciona, funcaoRemove} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const fechaFormItem = () => {
        setMostraFormItem(false);
    };
    const onSubmitItem = (item: ItemOrdemServico) => {
        funcaoAdiciona(item);
        fechaFormItem();
    };

    const [mostraFormItem, setMostraFormItem] = React.useState(false);
    let totalPlanejado = 0;
    let totalRealizado = 0;

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderItensOrdensServico
                        mostraFormItem={mostraFormItem}
                        funcaoMostraForm={() => {
                            let msg = null;
                            if (!ordemServico.idContrato || ordemServico.idContrato == -1) {
                                msg = `O contrato para o qual a Ordem de Serviço de serviço está sendo emitida deve ser informado`;
                            } else if (metricasContrato.length == 0) {
                                msg = `O contrato para o qual a Ordem de Serviço está sendo emitida não possui unidades de medidas vigentes`;
                            }
                            if (msg) {
                                enqueueSnackbar(msg, {variant: 'warning'});
                            } else {
                                setMostraFormItem(true);
                                //FIXME: if (inputRef) (inputRef as any).focus();
                            }
                        }}
                    />
                    <TableBody>
                        {ordemServico.itens &&
                            ordemServico.itens.map((item, i) => {
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
                    ordemServico={ordemServico}
                    metricasContrato={metricasContrato}
                    statusOrdemServico={
                        ordemServico.numeroDocumentoSEIOrdemServico
                            ? StatusOrdemServico.EMITIDA
                            : StatusOrdemServico.RASCUNHO
                    }
                    onSubmitItem={onSubmitItem}
                    fechaFormItem={fechaFormItem}
                />
            )}
        </React.Fragment>
    );
};
