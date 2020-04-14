import {DialogActions, Grid, makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import React, {Dispatch, useContext} from 'react';
import {ItemOrdemServico, OrdemServico} from '../../../models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from '../../App-Context';
import {useFormHook} from '../../customHooks/useForm';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {Type_Void} from '../../models/TypeFunctions';
import {postOrdemServico} from '../../services/backend';
import {formataDataStringLocal, formataNumeroTamanho3} from '../../services/formatacao';
import useStyles from '../../services/styles';
import {CampoLista, SelectItemNulo} from '../lib/campoLista';
import {CampoTexto} from '../lib/campoTexto';
import {ConteudoDialog} from '../lib/conteudoDialog';
import {TituloDialog} from '../lib/tituloDialog';
import {TabelaItensOrdensServico} from './tabelaItens';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const privateUseStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    rootContent: {
        padding: theme.spacing(2),
    },
}));

export const FormOrdemServico: React.FC<{ordemServico: OrdemServico; funcaoFecharForm: Type_Void}> = ({
    ordemServico,
    funcaoFecharForm,
}) => {
    const classes = useStyles();
    const privateClasses = privateUseStyles();
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const fornecedores: FornecedoresMap = state.fornecedores;
    const contratos: ContratosMap = state.contratos;
    const onSubmitOS = (ordemSubmetida: OrdemServico) => {
        postOrdemServico(ordemSubmetida).then((os) => {
            dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.ORDEM_SERVICO, dados: os});
            funcaoFecharForm();
        });
    };
    const {inputs, onInputChange, addItemArray, removeItemArray, onSubmit} = useFormHook(onSubmitOS, ordemServico);
    const [aberto, setAberto] = React.useState(true);

    const onClickClose = () => {
        setAberto(false);
        funcaoFecharForm();
    };
    const onAdicionaItem = (item: ItemOrdemServico) => {
        addItemArray('itens', item);
    };
    const onRemoveItem = (indice: number) => {
        removeItemArray('itens', indice);
    };
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="md"
                scroll="body"
                open={aberto}
                onClose={onClickClose}
                TransitionComponent={Transition}
            >
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TituloDialog
                        titulo={
                            inputs.numero
                                ? `Ordem de Serviço: ${String(inputs.numero).padStart(3, '0')}`
                                : 'Nova Ordem de Serviço'
                        }
                        funcaoFechar={onClickClose}
                    ></TituloDialog>
                    <ConteudoDialog dividers>
                        <Grid container>
                            {inputs.numeroDocumentoSEIOrdemServico != null && (
                                <React.Fragment>
                                    <Grid item xs={2}>
                                        <CampoTexto
                                            atributo="numeroDocumentoSEIOrdemServico"
                                            label="Número SEI"
                                            objetoValor={inputs}
                                            fullWidth={false}
                                            somenteLeitura={true}
                                            obrigatorio={false}
                                            funcaoFormatacao={formataNumeroTamanho3}
                                        />
                                    </Grid>
                                    <Grid item xs={10}></Grid>
                                </React.Fragment>
                            )}
                            <Grid item xs={12}>
                                <CampoLista
                                    atributo="idContrato"
                                    label="Contrato"
                                    objetoValor={inputs}
                                    fullWidth={true}
                                    somenteLeitura={inputs.id != null}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                    defaultValue={inputs.idContrato}
                                    opcoes={[SelectItemNulo].concat(
                                        Object.values(contratos).map((contrato) => {
                                            return {
                                                valor: contrato.id,
                                                label: String(contrato.numeroContrato)
                                                    .padStart(2, '0')
                                                    .concat(
                                                        '/',
                                                        String(contrato.anoContrato),
                                                        ' - ',
                                                        fornecedores[contrato.idFornecedor].razaoSocial,
                                                    ),
                                            };
                                        }),
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CampoLista
                                    atributo="idTipoOrdemServicoContrato"
                                    label="Tipo da Ordem de Serviço"
                                    objetoValor={inputs}
                                    fullWidth={true}
                                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                    defaultValue={inputs.idTipoOrdemServicoContrato}
                                    opcoes={[SelectItemNulo].concat(
                                        Object.values(contratos[inputs.idContrato].tiposOrdemServico).map((tipoOS) => {
                                            return {
                                                valor: tipoOS.id,
                                                label: tipoOS.descricao,
                                            };
                                        }),
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CampoLista
                                    atributo="emergencial"
                                    label="Criticidade"
                                    objetoValor={inputs}
                                    fullWidth={false}
                                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                    defaultValue={false}
                                    opcoes={[
                                        {valor: false, label: 'Normal'},
                                        {valor: true, label: 'Emergencial'},
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CampoTexto
                                    atributo="dtEmissao"
                                    label="Data de Emissão"
                                    objetoValor={inputs}
                                    fullWidth={false}
                                    somenteLeitura={true}
                                    funcaoFormatacao={formataDataStringLocal}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CampoTexto
                                    atributo="idProjeto"
                                    label="Código Projeto"
                                    objetoValor={inputs}
                                    fullWidth={false}
                                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                    obrigatorio={false}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CampoTexto
                                    atributo="idProduto"
                                    label="Sigla Produto"
                                    objetoValor={inputs}
                                    fullWidth={false}
                                    somenteLeitura={
                                        inputs.numeroDocumentoSEIOrdemServico != null && inputs.idProduto != null
                                    }
                                    obrigatorio={false}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CampoTexto
                                    atributo="nomeRequisitante"
                                    label="Nome do Requisitante"
                                    objetoValor={inputs}
                                    fullWidth={true}
                                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CampoTexto
                                    atributo="nomeFiscalTecnico"
                                    label="Fiscal Técnico"
                                    objetoValor={inputs}
                                    fullWidth={true}
                                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TabelaItensOrdensServico
                                    ordemServico={inputs as OrdemServico}
                                    funcaoAdiciona={onAdicionaItem}
                                    funcaoRemove={onRemoveItem}
                                />
                            </Grid>
                        </Grid>
                    </ConteudoDialog>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
