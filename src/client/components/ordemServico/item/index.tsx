import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext, useEffect} from 'react';
import {IItemOrdemServico, IOrdemServico} from '../../../../commonLib/interface-models';
import {getStatusOrdemServico} from '../../../../commonLib/interface-models/getStatusOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useControleEdicaoEntidadesFilhos} from '../../../customHooks/useControleEdicaoEntidadesFilhos';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {FooterItensOrdensServico} from './footer';
import {FormItemOrdensServico} from './form';
import {HeaderItensOrdensServico} from './header';
import {novoItemOrdemServico} from './new';
import {RowItemOrdemServico} from './row';
import {valida} from './valida';

export const TabelaItensOrdensServico: React.FC<{
    funcaoAdicionar: (item: IItemOrdemServico) => void;
    funcaoAtualizar: (item: IItemOrdemServico, indice: number) => void;
    funcaoRemover: (indice: number) => void;
}> = (props) => {
    const {funcaoAdicionar, funcaoAtualizar, funcaoRemover} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens

    const refInputDescricaoItem = React.useRef<HTMLInputElement>(null);
    const refButtonAdicionaItem = React.useRef<HTMLInputElement>(null);

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const statusOrdemServico = getStatusOrdemServico(osState.dado);

    //Custom Hook para controle dos elementos visuais durante a edição
    const {criar, editar, confirmar, fecharForm, remover, instancia, mostraForm} = useControleEdicaoEntidadesFilhos<
        IItemOrdemServico
    >(funcaoAdicionar, funcaoAtualizar, funcaoRemover, refInputDescricaoItem, refButtonAdicionaItem);
    //custom hook para controle de estado dos atributos da entidade
    let [errosInput, setErrosInput] = React.useState({
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
        quantidadeReal: '',
        valorUnitarioReal: '',
    });
    const {inputs, updateInputs, hasChanged, onInputChange, onSubmit} = useFormHook(
        (item: IItemOrdemServico, indice?: number) => {
            errosInput = valida(item, statusOrdemServico);
            if (Object.values(errosInput).every((v) => v == '')) {
                confirmar(item);
            } else {
                setErrosInput({...errosInput});
                Object.values(errosInput).forEach((msg) => {
                    if (msg != '') {
                        enqueueSnackbar(msg, {variant: 'warning'});
                    }
                });
            }
        },
        instancia,
    );

    //quando mudar a instancia em edição, é preciso atualizar a variável 'inputs',
    //que é passada para o componente do Form. Se não for feito, ficará null
    useEffect(() => {
        updateInputs(instancia);
    }, [instancia]);

    let totalPlanejado = 0;
    let totalRealizado = 0;

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Serviços</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderItensOrdensServico
                        mostraForm={mostraForm}
                        funcaoAdicionar={() => {
                            let msg = null;
                            if (!osState.dado.idContrato || osState.dado.idContrato == -1) {
                                msg = `O contrato para o qual a Ordem de Serviço de serviço está sendo emitida deve ser informado`;
                            } else if (
                                !contratos[osState.dado.idContrato].metricas ||
                                contratos[osState.dado.idContrato].metricas.length == 0
                            ) {
                                msg = `O contrato para o qual a Ordem de Serviço está sendo emitida não possui unidades de medidas vigentes`;
                            }
                            msg
                                ? enqueueSnackbar(msg, {variant: 'warning'})
                                : criar(novoItemOrdemServico(osState.dado, contratos[osState.dado.idContrato]), inputs);
                        }}
                        buttonAdicionaRef={refButtonAdicionaItem}
                    />
                    <TableBody>
                        {osState.dado.itens &&
                            osState.dado.itens.map((itemObj, i) => {
                                const item = itemObj as IItemOrdemServico;
                                if (i == 0) totalPlanejado = totalRealizado = 0;
                                totalPlanejado += item.quantidadeEstimada * item.valorUnitarioEstimado;
                                totalRealizado +=
                                    (item.quantidadeReal || 0) *
                                    (item.valorUnitarioReal || item.valorUnitarioEstimado || 0);
                                return (
                                    <RowItemOrdemServico
                                        item={item}
                                        key={i}
                                        funcaoEditar={editar.bind(null, item, hasChanged, i)}
                                        funcaoRemover={remover.bind(null, hasChanged, i)}
                                    />
                                );
                            })}
                        {mostraForm && (
                            <FormItemOrdensServico
                                itemEditado={inputs}
                                onInputChange={onInputChange}
                                onSubmitForm={onSubmit}
                                fechaForm={fecharForm}
                                inputDescricaoItemRef={refInputDescricaoItem}
                                errosInput={errosInput}
                            />
                        )}
                    </TableBody>
                    <FooterItensOrdensServico totalPlanejado={totalPlanejado} totalRealizado={totalRealizado} />
                </Table>
            </TableContainer>
        </div>
    );
};
