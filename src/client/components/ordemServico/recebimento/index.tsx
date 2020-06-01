import DateFnsUtils from '@date-io/date-fns';
import {Button, Dialog, Grid} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {getAcoesOrdemServico, getAcoesRecebimentoOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {
    IEntregavelRecebimentoOrdemServico,
    IOrdemServico,
    IRecebimentoOrdemServico,
} from '../../../../commonLib/interface-models';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {useGetRespostaServico} from '../../../customHooks/useGetRespostaServico';
import {EditionType, IEntidadeContexto} from '../../../models/EntidadeContext';
import {emitirTermoRecebimentoSEI} from '../../../services/backend';
import {getDataISOHoraSemHorario} from '../../../services/dataHora';
import useStyles from '../../../services/styles';
import {DialogActions} from '../../lib/acoesDialog';
import {CampoData} from '../../lib/CampoData';
import {CampoLista} from '../../lib/campoLista';
import {ConteudoDialog} from '../../lib/conteudoDialog';
import {TituloDialog} from '../../lib/tituloDialog';
import {Transicao} from '../../lib/Transicao';
import {OrdemServicoContext} from '../contextOrdemServico';
import {TabelaEntregaveisRecebimentoOrdensServico} from './entregavel';
import {novoRecebimentoOrdemServico} from './new';

export const FormRecebimentosOrdensServico: React.FC<{
    funcaoAdicionar: (recebimento: IRecebimentoOrdemServico) => void;
}> = (props) => {
    const {funcaoAdicionar} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState, dispatch: osDispatch}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);

    const [aberto, setAberto] = React.useState(true);
    const onClickClose = () => {
        setAberto(false);
        osDispatch({
            tipo: EditionType.SETAR_STATUS,
            status: {emitindoTermoRecebimento: false},
        });
    };

    const {getRespostaServico: getRespostaPostRecebimentoOrdemServico} = useGetRespostaServico<
        IRecebimentoOrdemServico
    >(emitirTermoRecebimentoSEI);

    //custom hook para controle de estado dos atributos da entidade
    let [errosInput, setErrosInput] = React.useState<{[atributo: string]: boolean}>({});
    const {inputs, updateInputs, hasChanged, onInputChange, onSubmit} = useFormHook(
        async (recebimento: IRecebimentoOrdemServico) => {
            //Habilitação de ações
            const pode = getAcoesRecebimentoOrdemServico(TipoUsoPermissoes.VALIDAR_UI, recebimento, osState.dado);
            const validacao = pode.salvar();
            if (validacao.ok) {
                //Removendo dataHora do recebimento
                recebimento.dtRecebimento = getDataISOHoraSemHorario(recebimento.dtRecebimento);
                const respostaServico = await getRespostaPostRecebimentoOrdemServico(recebimento);
                if (respostaServico.sucesso) {
                    /*appDispatch({
                            tipo: ActionType.INCLUIR,
                            entidade: ActionEntity.ORDEM_SERVICO,
                            dados: respostaServico.dados,
                        });
                        osDispatch({tipo: EditionType.FECHAR});*/
                    enqueueSnackbar(`Termo de Recebimento da Ordem de Serviço registrado com sucesso`, {
                        variant: 'success',
                    });
                    onClickClose();
                    window.open(respostaServico.dados.linkTermoRecebimentoSEI, '_blank');
                }
            } else if (validacao.mensagensAtributo) {
                Object.keys(validacao.mensagensAtributo).forEach((atributo: string) => {
                    errosInput[atributo] = true;
                    const msg = (validacao.mensagensAtributo as any)[atributo];
                    enqueueSnackbar(msg, {variant: 'warning'});
                });
                setErrosInput({...errosInput});
            }
        },
        novoRecebimentoOrdemServico(osState.dado),
    );

    //Habilitação de ações
    const pode = getAcoesOrdemServico(TipoUsoPermissoes.HABILITAR_UI, osState.dado);

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    fullWidth
                    maxWidth="md"
                    scroll="body"
                    open={aberto}
                    onClose={onClickClose}
                    TransitionComponent={Transicao}
                >
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TituloDialog titulo="Recebimento" funcaoFechar={onClickClose}></TituloDialog>
                        <ConteudoDialog dividers>
                            <Grid container>
                                <Grid item xs={3}>
                                    <CampoData
                                        fullWidth={true}
                                        atributo="dtRecebimento"
                                        label="Data do Recebimento"
                                        objetoValor={inputs}
                                        obrigatorio={true}
                                        onChange={onInputChange}
                                        error={errosInput.dtRecebimento}
                                        dataMaxima={new Date()}
                                        desabilitaDatasFuturas={true}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <CampoLista
                                        atributo="tipoRecebimento"
                                        label="Tipo"
                                        objetoValor={inputs}
                                        fullWidth={true}
                                        obrigatorio={true}
                                        onChange={onInputChange}
                                        defaultValue={'P'}
                                        opcoes={[
                                            {valor: '', label: ''},
                                            {valor: 'P', label: 'Provisório'},
                                            {valor: 'D', label: 'Definitivo'},
                                        ]}
                                        error={errosInput.tipoRecebimento}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TabelaEntregaveisRecebimentoOrdensServico
                                        recebimento={inputs}
                                        funcaoAdicionar={(entregavel: IEntregavelRecebimentoOrdemServico) => {
                                            //addItemArray('entregaveis', entregavel);
                                            inputs['entregaveis'].push(entregavel);
                                            updateInputs(inputs);
                                        }}
                                        funcaoAtualizar={(
                                            entregavel: IEntregavelRecebimentoOrdemServico,
                                            indice: number,
                                        ) => {
                                            inputs['entregaveis'][indice] = entregavel;
                                            updateInputs(inputs);
                                            //updateItemArray('entregaveis', indice, entregavel);
                                        }}
                                        funcaoRemover={(indice: number) => {
                                            //markToRemoveItemArray('entregaveis', indice);
                                            inputs['entregaveis'].splice(indice, 1);
                                            updateInputs(inputs);
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
            </MuiPickersUtilsProvider>
        </div>
    );
};
