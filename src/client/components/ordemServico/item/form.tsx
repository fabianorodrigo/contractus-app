import {Grid, IconButton, Tooltip} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {ItemOrdemServico, OrdemServicoFull} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import {CampoLista} from '../../lib/campoLista';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {novoItemOrdemServico} from './new';
export const FormItemOrdensServico: React.FC<{
    statusOrdemServico: StatusOrdemServico;
    onSubmitItem: Function;
    fechaFormItem: Function;
    inputDescricaoItemRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {statusOrdemServico, onSubmitItem, fechaFormItem, inputDescricaoItemRef} = props;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
        quantidadeReal: '',
        valorUnitarioReal: '',
    });
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const valida = (item: ItemOrdemServico) => {
        errosInput.descricao =
            item.descricao == null || item.descricao.trim() == '' ? 'Uma descrição do serviço deve ser informada' : '';
        errosInput.siglaMetrica =
            item.siglaMetrica == null || item.siglaMetrica.trim() == ''
                ? 'A unidade do serviço deve ser informada'
                : '';
        errosInput.quantidadeEstimada =
            item.quantidadeEstimada <= 0 ? 'O quantitavo do serviço deve ser informado' : '';
        errosInput.valorUnitarioEstimado =
            item.valorUnitarioEstimado <= 0 ? 'O valor unitário do serviço deve ser informado' : '';

        if (Object.values(errosInput).every((v) => v == '')) {
            onSubmitItem(item);
            limpaForm();
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((msg) => {
                if (msg != '') {
                    enqueueSnackbar(msg, {variant: 'warning'});
                }
            });
        }
    };
    const {inputs, onInputChange, onSubmit} = useFormHook(valida, novoItemOrdemServico(osState.dado));
    const limpaForm = () => {
        inputs.descricao = '';
        inputs.siglaMetrica = '';
        inputs.quantidadeEstimada = '';
        inputs.valorUnitarioEstimado = '';
    };
    return (
        <Grid container>
            <Grid item xs={4}>
                <CampoTexto
                    fullWidth={true}
                    atributo="descricao"
                    label="Descrição"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico > statusOrdemServico}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.descricao != ''}
                    inputRef={inputDescricaoItemRef}
                />
            </Grid>
            <Grid item xs={1}>
                <CampoLista
                    atributo="siglaMetrica"
                    label="Unidade"
                    objetoValor={inputs}
                    somenteLeitura={osState.dado.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    defaultValue={
                        contratos[osState.dado.idContrato] && contratos[osState.dado.idContrato].metricas.length > 0
                            ? contratos[osState.dado.idContrato].metricas[0].sigla
                            : ''
                    }
                    error={errosInput.siglaMetrica != ''}
                    opcoes={
                        contratos[osState.dado.idContrato] && contratos[osState.dado.idContrato].metricas
                            ? contratos[osState.dado.idContrato].metricas.map((metrica) => {
                                  return {
                                      valor: metrica.sigla,
                                      label: metrica.sigla,
                                  };
                              })
                            : []
                    }
                ></CampoLista>
            </Grid>
            <Grid item xs={1}>
                <CampoTexto
                    fullWidth={true}
                    atributo="quantidadeEstimada"
                    label="Quantidade"
                    objetoValor={inputs}
                    somenteLeitura={osState.dado.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    error={errosInput.quantidadeEstimada != ''}
                />
            </Grid>
            <Grid item xs={2}>
                <CampoTexto
                    fullWidth={true}
                    atributo="valorUnitarioEstimado"
                    label="Valor Unitário"
                    objetoValor={inputs}
                    somenteLeitura={osState.dado.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    error={errosInput.valorUnitarioEstimado != ''}
                />
            </Grid>
            <Grid item xs={1}>
                <CampoTexto
                    fullWidth={true}
                    atributo="quantidadeReal"
                    label="Qtd Real"
                    objetoValor={inputs}
                    somenteLeitura={osState.dado.numeroDocumentoSEIOrdemServico == null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    error={errosInput.quantidadeReal != ''}
                />
            </Grid>
            <Grid item xs={2}>
                <CampoTexto
                    fullWidth={true}
                    atributo="valorUnitarioReal"
                    label="Valor Unitário Real"
                    objetoValor={inputs}
                    somenteLeitura={osState.dado.numeroDocumentoSEIOrdemServico == null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    error={errosInput.valorUnitarioReal != ''}
                />
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Confirmar">
                    <IconButton key={`buttonAddItem`} size="small" onClick={onSubmit}>
                        <DoneIcon aria-label="Confirmar" color="primary" fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                    <IconButton
                        key={`buttonClearItem`}
                        size="small"
                        onClick={() => {
                            limpaForm();
                            fechaFormItem();
                        }}
                    >
                        <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};
