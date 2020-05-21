import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext, useEffect} from 'react';
import {getAcoesEtapaOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {IOrdemServico} from '../../../../commonLib/interface-models';
import {getTipoOrdemServico} from '../../../../commonLib/interface-models/getTipoOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {EtapaOrdemServico} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useControleEdicaoEntidadesFilhos} from '../../../customHooks/useControleEdicaoEntidadesFilhos';
import {useFormHook} from '../../../customHooks/useForm';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {FormEtapaOrdensServico} from './form';
import {HeaderEtapasOrdensServico} from './header';
import {novaEtapaOrdemServico} from './new';
import {RowEtapaOrdemServico} from './row';

export const TabelaEtapasOrdensServico: React.FC<{
    funcaoAdicionar: (etapa: EtapaOrdemServico) => void;
    funcaoAtualizar: (etapa: EtapaOrdemServico, indice: number) => void;
    funcaoRemover: (indice: number) => void;
}> = (props) => {
    const {funcaoAdicionar, funcaoAtualizar, funcaoRemover} = props;
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens

    const refInputDescricaoEtapa = React.useRef<HTMLInputElement>(null);
    const refButtonAdicionaEtapa = React.useRef<HTMLInputElement>(null);

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    //Custom Hook para controle dos elementos visuais durante a edição
    const {criar, editar, confirmar, fecharForm, remover, instancia, mostraForm} = useControleEdicaoEntidadesFilhos<
        EtapaOrdemServico
    >(funcaoAdicionar, funcaoAtualizar, funcaoRemover, refInputDescricaoEtapa, refButtonAdicionaEtapa);
    //custom hook para controle de estado dos atributos da entidade
    let [errosInput, setErrosInput] = React.useState<{[atributo: string]: boolean}>({});
    const {inputs, updateInputs, hasChanged, onInputChange, onSubmit} = useFormHook((etapa: EtapaOrdemServico) => {
        //Habilitação de ações
        const pode = getAcoesEtapaOrdemServico(TipoUsoPermissoes.VALIDAR_UI, etapa);
        const validacao = pode.salvar();

        if (validacao.ok) {
            confirmar(etapa);
        } else if (validacao.mensagensAtributo) {
            Object.keys(validacao.mensagensAtributo).forEach((atributo: string) => {
                errosInput[atributo] = true;
                const msg = (validacao.mensagensAtributo as any)[atributo];
                enqueueSnackbar(msg, {variant: 'warning'});
            });
            setErrosInput({...errosInput});
        }
    }, instancia);

    //quando mudar a instancia em edição, é preciso atualizar a variável 'inputs',
    //que é passada para o componente do Form. Se não for feito, ficará null
    useEffect(() => {
        updateInputs(instancia);
    }, [instancia]);

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Cronograma de Etapas</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderEtapasOrdensServico
                        mostraForm={mostraForm}
                        funcaoAdicionar={criar.bind(
                            null,
                            novaEtapaOrdemServico(
                                osState.dado,
                                tipoOrdemServico?.etapas && tipoOrdemServico.etapas.length > 0
                                    ? tipoOrdemServico.etapas[0].numeroDiasUteisDuracao
                                    : 10,
                            ),
                            inputs,
                        )}
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
                                        funcaoEditar={editar.bind(null, etapa, hasChanged, i)}
                                        funcaoRemover={remover.bind(null, hasChanged, i)}
                                    />
                                );
                            })}
                        {mostraForm && (
                            <FormEtapaOrdensServico
                                etapaEditada={inputs}
                                onInputChange={onInputChange}
                                onSubmitForm={onSubmit}
                                fechaForm={fecharForm}
                                inputDescricaoEtapaRef={refInputDescricaoEtapa}
                                errosInput={errosInput}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
