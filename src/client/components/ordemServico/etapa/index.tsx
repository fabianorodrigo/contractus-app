import {InputLabel, Paper, Table, TableBody, TableContainer} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {EtapaOrdemServico, OrdemServicoFull} from '../../../../models';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useControleEdicaoEntidadesFilhos} from '../../../customHooks/useControleEdicaoEntidadesFilhos';
import {IEntidadeContexto} from '../../../models/EntidadeContext';
import {ContratosMap} from '../../../models/TypeContext';
import useStyles from '../../../services/styles';
import {OrdemServicoContext} from '../context';
import {getTipoOrdemServico} from '../getTipoOrdemServico';
import {FormEtapaOrdensServico} from './form';
import {HeaderEtapasOrdensServico} from './header';
import {novaEtapaOrdemServico} from './new';
import {RowEtapaOrdemServico} from './row';

export const TabelaEtapasOrdensServico: React.FC<{
    funcaoAdicionar: (etapa: EtapaOrdemServico) => void;
    funcaoAtualizar: (etapa: EtapaOrdemServico, indice: number) => void;
    funcaoRemover: (indice: number) => void;
}> = (props) => {
    const refInputDescricaoEtapa = React.useRef<HTMLInputElement>(null);
    const refButtonAdicionaEtapa = React.useRef<HTMLInputElement>(null);

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;

    const {state: osState}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    const {funcaoAdicionar, funcaoAtualizar, funcaoRemover} = props;
    const classes = useStyles();

    //Custom Hook para controle dos elementos visuais durante a edição
    const {criar, editar, confirmar, fecharForm, remover, instancia, mostraForm} = useControleEdicaoEntidadesFilhos<
        EtapaOrdemServico
    >(funcaoAdicionar, funcaoAtualizar, funcaoRemover, refInputDescricaoEtapa, refButtonAdicionaEtapa);

    return (
        <div style={{marginLeft: 8, marginTop: 8}}>
            <InputLabel shrink>Cronograma de Etapas</InputLabel>
            <TableContainer component={Paper}>
                <Table size="small" className={classes.tableInForm}>
                    <HeaderEtapasOrdensServico
                        mostraFormEtapa={mostraForm}
                        funcaoAdicionar={criar.bind(
                            null,
                            novaEtapaOrdemServico(
                                osState.dado,
                                tipoOrdemServico?.etapas && tipoOrdemServico.etapas.length > 0
                                    ? tipoOrdemServico.etapas[0].numeroDiasUteisDuracao
                                    : 10,
                            ),
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
                                        funcaoEditar={editar.bind(null, etapa, i)}
                                        funcaoRemover={remover.bind(null, i)}
                                    />
                                );
                            })}
                        {mostraForm && (
                            <FormEtapaOrdensServico
                                etapaEditada={instancia}
                                onSubmitForm={confirmar}
                                fechaForm={fecharForm}
                                inputDescricaoEtapaRef={refInputDescricaoEtapa}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
