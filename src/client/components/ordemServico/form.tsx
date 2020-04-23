import {DialogActions, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {ItemOrdemServico, OrdemServico, OrdemServicoFull} from '../../../models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from '../../App-Context';
import {useFormHook} from '../../customHooks/useForm';
import {EditionType, IEntidadeContexto} from '../../models/EntidadeContext';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {postOrdemServico} from '../../services/backend';
import {formataDataStringLocal, formataMensagemErroLoopback, formataNumeroTamanho3} from '../../services/formatacao';
import useStyles from '../../services/styles';
import {CampoLista, SelectItemNulo} from '../lib/campoLista';
import {CampoTexto} from '../lib/campoTexto';
import {ConteudoDialog} from '../lib/conteudoDialog';
import {TituloDialog} from '../lib/tituloDialog';
import {OrdemServicoContext} from './context';
import {TabelaItensOrdensServico} from './item';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FormOrdemServico: React.FC<{}> = ({}) => {
    const classes = useStyles();
    //TIP REACT:A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const ordemServicoContexto: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const {state: osState, dispatch: osDispatch} = ordemServicoContexto;

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const fornecedores: FornecedoresMap = appState.fornecedores;
    const contratos: ContratosMap = appState.contratos;

    const [errosInput, setErrosInput] = React.useState({
        idContrato: '',
        idTipoOrdemServicoContrato: '',
        emergencial: '',
        nomeRequisitante: '',
        nomeFiscalTecnico: '',
        itens: '',
    });

    const valida = (os: OrdemServicoFull) => {
        errosInput.idContrato =
            os.idContrato == null || os.idContrato < 0
                ? 'O contrato ao qual a ordem de serviço se refere deve ser informado'
                : '';
        errosInput.idTipoOrdemServicoContrato =
            os.idTipoOrdemServicoContrato == null || os.idTipoOrdemServicoContrato < 0
                ? 'O tipo da Ordem de Serviço deve ser informado'
                : '';
        errosInput.emergencial = os.emergencial == null ? 'A criticidade dos serviços deve ser informada' : '';
        errosInput.nomeRequisitante =
            os.nomeRequisitante == null || os.nomeRequisitante.trim() == ''
                ? 'O nome do requisitante do serviço deve ser informado'
                : '';
        errosInput.nomeFiscalTecnico =
            os.nomeFiscalTecnico == null || os.nomeFiscalTecnico.trim() == ''
                ? 'O nome do fiscal técnico do serviço deve ser informado'
                : '';
        errosInput.itens =
            os.itens == null || os.itens.length == 0
                ? 'Os itens da ordem de serviço contratados devem ser especificados'
                : '';

        return Object.values(errosInput).every((v) => v == '');
    };

    const onSubmitOS = async () => {
        if (valida(osState.dado)) {
            try {
                const os = await postOrdemServico(osState.dado);
                if (os.hasOwnProperty('error')) {
                    enqueueSnackbar(formataMensagemErroLoopback((os as any).error), {variant: 'error'});
                    console.error(os);
                } else {
                    appDispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.ORDEM_SERVICO, dados: os});
                    osDispatch({tipo: EditionType.FECHAR});
                    enqueueSnackbar(`Ordem de Serviço ${osState.dado.id ? 'atualizada' : 'cadastrada'} com sucesso`, {
                        variant: 'success',
                    });
                }
            } catch (e) {
                console.log('deu catch', e);
                alert(e);
            }
        } else {
            setErrosInput({...errosInput});
            Object.values(errosInput).forEach((message) => {
                if (message != null && message != '') {
                    enqueueSnackbar(message, {variant: 'error'});
                }
            });
        }
    };
    const {inputs, onInputChange, addItemArray, markToRemoveItemArray, onSubmit} = useFormHook<OrdemServicoFull>(
        onSubmitOS,
        osState.dado as OrdemServicoFull,
        ordemServicoContexto,
    );
    const [aberto, setAberto] = React.useState(true);

    const onClickClose = () => {
        setAberto(false);
        osDispatch({tipo: EditionType.FECHAR});
    };
    const onAdicionaItem = (item: ItemOrdemServico) => {
        addItemArray('itens', item);
    };
    const onRemoveItem = (indice: number) => {
        markToRemoveItemArray('itens', indice);
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
                                    somenteLeitura={
                                        inputs.id != null || (osState.dado as OrdemServicoFull).itens?.length > 0
                                    }
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
                                    error={errosInput.idContrato != ''}
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
                                    opcoes={
                                        contratos[inputs.idContrato]
                                            ? [SelectItemNulo].concat(
                                                  Object.values(contratos[inputs.idContrato].tiposOrdemServico).map(
                                                      (tipoOS) => {
                                                          return {
                                                              valor: tipoOS.id,
                                                              label: tipoOS.descricao,
                                                          };
                                                      },
                                                  ),
                                              )
                                            : [SelectItemNulo]
                                    }
                                    error={errosInput.idTipoOrdemServicoContrato != ''}
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
                                    error={errosInput.emergencial != ''}
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
                                    error={errosInput.nomeRequisitante != ''}
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
                                    error={errosInput.nomeFiscalTecnico != ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TabelaItensOrdensServico
                                    ordemServico={inputs as OrdemServico}
                                    metricasContrato={
                                        contratos[inputs.idContrato] == null
                                            ? []
                                            : Object.values(contratos[inputs.idContrato].metricas)
                                    }
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
                        <Button color="primary" onClick={onClickClose}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
