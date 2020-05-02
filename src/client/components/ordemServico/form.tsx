import {DialogActions, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {EntregavelOrdemServico, EtapaOrdemServico, ItemOrdemServico, OrdemServicoFull} from '../../../models';
import {getStatusOrdemServico} from '../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../models/StatusOrdemServico';
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
import {Transicao} from '../lib/Transicao';
import {OrdemServicoContext} from './context';
import {TabelaEntregaveisOrdensServico} from './entregavel';
import {TabelaEtapasOrdensServico} from './etapa';
import {TabelaItensOrdensServico} from './item';

export const FormOrdemServico: React.FC<{}> = ({}) => {
    const classes = useStyles();
    //TIP REACT:A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const fornecedores: FornecedoresMap = appState.fornecedores;
    const contratos: ContratosMap = appState.contratos;
    const ordemServicoContexto: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const {state: osState, dispatch: osDispatch} = ordemServicoContexto;
    const statusOS = getStatusOrdemServico(osState.dado);

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens

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
                const respostaServico = await postOrdemServico(osState.dado);
                if (!respostaServico.sucesso) {
                    enqueueSnackbar(formataMensagemErroLoopback((respostaServico.dados as any).error), {
                        variant: 'error',
                    });
                    console.error(respostaServico.dados);
                    console.warn(osState.dado);
                } else {
                    appDispatch({
                        tipo: ActionType.INCLUIR,
                        entidade: ActionEntity.ORDEM_SERVICO,
                        dados: respostaServico.dados,
                    });
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

    /**
     * Tratamento diferenciado quando muda o contrato ou o tipo da Ordem de Serviço
     */
    const onChangeContratoOuTipoOrdemServiço = (event: React.ChangeEvent<HTMLInputElement>) => {
        let entregaveis = [];
        //se mudou contrato ou o tipo da Ordem de Serviço e não há nenhum entregável que não seja
        //exatamente os carregados por esta função (auto=true), carrega os entregáveis default do tipo da OS no contrato
        onInputChange(event);
        //contrato existe
        if (contratos[osState.dado.idContrato]) {
            const tipoOS = contratos[osState.dado.idContrato].tiposOrdemServico.find((tipo) => {
                return tipo.id == osState.dado.idTipoOrdemServicoContrato;
            });
            //se o tipo OS foi selecionado
            if (tipoOS) {
                //se não existe nenhum além dos carregados automaticamente, carrega os entregáveis default do tipo da OS
                if (
                    !osState.dado.entregaveis ||
                    osState.dado.entregaveis.filter((entregavel) => !entregavel.hasOwnProperty('auto')).length == 0
                ) {
                    entregaveis = tipoOS.entregaveis.map((e) => {
                        return {
                            descricao: e.descricao,
                            ordem: e.ordem,
                            idOrdemServico: osState.dado.id,
                            auto: true,
                        };
                    });
                    const entidade = osState;
                    entidade.dado.entregaveis = entregaveis;
                    osDispatch({
                        tipo: EditionType.ATUALIZAR_CONTEXTO,
                        dado: {...entidade.dado} as OrdemServicoFull,
                    });
                }
            }
        }
    };
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="md"
                scroll="body"
                open={aberto}
                onClose={onClickClose}
                TransitionComponent={Transicao}
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
                            {statusOS > StatusOrdemServico.RASCUNHO && (
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
                                    onChange={onChangeContratoOuTipoOrdemServiço}
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
                                    autoFocus={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CampoLista
                                    atributo="idTipoOrdemServicoContrato"
                                    label="Tipo da Ordem de Serviço"
                                    objetoValor={inputs}
                                    fullWidth={true}
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO}
                                    obrigatorio={true}
                                    onChange={onChangeContratoOuTipoOrdemServiço}
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
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO}
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
                            <Grid item xs={2}>
                                {statusOS > StatusOrdemServico.RASCUNHO && (
                                    <CampoTexto
                                        atributo="dtEmissao"
                                        label="Data de Emissão"
                                        objetoValor={inputs}
                                        fullWidth={false}
                                        somenteLeitura={true}
                                        funcaoFormatacao={formataDataStringLocal}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <CampoTexto
                                    atributo="idProjeto"
                                    label="Código Projeto"
                                    objetoValor={inputs}
                                    fullWidth={false}
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO && inputs.idProjeto != null}
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
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO && inputs.idProduto != null}
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
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO}
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
                                    somenteLeitura={statusOS > StatusOrdemServico.RASCUNHO}
                                    obrigatorio={true}
                                    onChange={onInputChange}
                                    error={errosInput.nomeFiscalTecnico != ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TabelaItensOrdensServico
                                    funcaoAdiciona={(item: ItemOrdemServico) => {
                                        addItemArray('itens', item);
                                    }}
                                    funcaoRemove={(indice: number) => {
                                        markToRemoveItemArray('itens', indice);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TabelaEtapasOrdensServico
                                    funcaoAdiciona={(etapa: EtapaOrdemServico) => {
                                        addItemArray('etapas', etapa);
                                    }}
                                    funcaoRemove={(indice: number) => {
                                        markToRemoveItemArray('etapas', indice);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TabelaEntregaveisOrdensServico
                                    funcaoAdiciona={(entregavel: EntregavelOrdemServico) => {
                                        addItemArray('entregaveis', entregavel);
                                    }}
                                    funcaoRemove={(indice: number) => {
                                        markToRemoveItemArray('entregaveis', indice);
                                    }}
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
