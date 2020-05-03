import {Grid, IconButton, Tooltip} from '@material-ui/core';
import 'date-fns';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {EntregavelOrdemServico, OrdemServicoFull} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {CampoTexto} from '../../lib/campoTexto';
import {ClearIcon, DoneIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../context';
import {novoEntregavelOrdemServico} from './new';
export const FormEntregavelOrdemServico: React.FC<{
    statusOrdemServico: StatusOrdemServico;
    onSubmitForm: Function;
    fechaForm: Function;
    inputDescricaoRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {statusOrdemServico, onSubmitForm, fechaForm, inputDescricaoRef} = props;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        linkEvidencia: '',
    });
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const valida = (entregavel: EntregavelOrdemServico) => {
        errosInput.descricao =
            entregavel.descricao == null || entregavel.descricao.trim() == ''
                ? 'Uma descrição para o entregável da Ordem de Serviço deve ser informada'
                : '';

        if (Object.values(errosInput).every((v) => v == '')) {
            onSubmitForm(entregavel);
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((msg) => {
                if (msg != '') {
                    enqueueSnackbar(msg, {variant: 'warning'});
                }
            });
        }
    };
    const {inputs, onInputChange, onSubmit} = useFormHook(valida, novoEntregavelOrdemServico(osState.dado));
    return (
        <Grid container>
            <Grid item xs={3}>
                <CampoTexto
                    fullWidth={true}
                    atributo="descricao"
                    label="Entregável"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.descricao != ''}
                    inputRef={inputDescricaoRef}
                />
            </Grid>
            <Grid item xs={8}>
                <CampoTexto
                    fullWidth={true}
                    atributo="linkEvidencia"
                    label="Link Evidência"
                    objetoValor={inputs}
                    somenteLeitura={
                        statusOrdemServico == StatusOrdemServico.RASCUNHO ||
                        statusOrdemServico > StatusOrdemServico.RECEBIDA
                    }
                    obrigatorio={true}
                    onChange={onInputChange}
                    error={errosInput.descricao != ''}
                />
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Confirmar">
                    <IconButton key={`buttonAdd`} size="small" onClick={onSubmit}>
                        <DoneIcon aria-label="Confirmar" color="primary" fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                    <IconButton
                        key={`buttonClear`}
                        size="small"
                        onClick={() => {
                            fechaForm();
                        }}
                    >
                        <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};
