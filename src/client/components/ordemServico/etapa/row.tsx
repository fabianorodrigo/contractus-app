import {IconButton, makeStyles, TableCell, TableRow, Tooltip} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {getAcoesEtapaOrdemServico, TipoUsoPermissoes} from '../../../../commonLib';
import {formataDataStringLocal, formataNumeroStringLocal} from '../../../../commonLib/formatacao';
import {IEtapaOrdemServico, IOrdemServico} from '../../../../commonLib/interface-models';
import {getTipoOrdemServico} from '../../../../commonLib/interface-models/getTipoOrdemServico';
import {ContratosMap} from '../../../../commonLib/interface-models/maps-entidades-types';
import {ActionType, AppContext, AppContextStoreType} from '../../../App-Context';
import {EditionType, IEntidadeContexto} from '../../../models/EntidadeContext';
import {emitirTermoAceitacaoEtapaSEI} from '../../../services/backend';
import {formataMensagemErro, formataMensagemErroLoopback} from '../../../services/formatacaoMensagensErro';
import {DeleteIcon, DescriptionIcon, EditIcon, FindInPageIcon} from '../../lib/icons';
import {OrdemServicoContext} from '../contextOrdemServico';

const privateUseStyles = makeStyles((theme) => ({
    deleted: {
        textDecoration: 'line-through',
        color: 'danger',
    },
    notDeleted: {
        textDecoration: 'normal',
    },
}));

export const RowEtapaOrdemServico: React.FC<{
    etapa: IEtapaOrdemServico;
    funcaoEditar: () => void;
    order?: number;
    funcaoRemover: () => void;
}> = (props) => {
    const {etapa, funcaoEditar, order, funcaoRemover} = props;
    const i = `${etapa.id}${etapa.descricao}_${order}`;
    const privateClasses = privateUseStyles();

    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state: appState, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    const contratos: ContratosMap = appState.contratos;
    const {state: osState, dispatch: osDispatch}: IEntidadeContexto<IOrdemServico> = useContext(OrdemServicoContext);
    const tipoOrdemServico = getTipoOrdemServico(osState.dado, contratos);

    //Função que para setar o state que coloca o BackDrop na frente da tela com o indicador de progresso ativo
    const emEspera = (emEspera: boolean) => {
        appDispatch({
            tipo: ActionType.EM_ESPERA,
            dados: emEspera,
        });
    };
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    //funcao para tratar chamadas assíncronas a serviços
    const emitirTermoAceitacao = async (etapa: IEtapaOrdemServico): Promise<void> => {
        try {
            emEspera(true);
            const respostaServico = await emitirTermoAceitacaoEtapaSEI(appState.usuario?.token, etapa);
            if (!respostaServico.sucesso) {
                enqueueSnackbar(formataMensagemErroLoopback((respostaServico.dados as any).error), {
                    variant: 'error',
                });
                console.error(respostaServico.dados);
                console.warn(etapa);
            } else {
                const indexEtapa = osState.dado.etapas.findIndex((e) => (e as IEtapaOrdemServico).id == etapa.id);
                osState.dado.etapas[indexEtapa] = respostaServico.dados;
                osDispatch({
                    tipo: EditionType.ATUALIZAR_CONTEXTO,
                    dado: {
                        ...osState.dado,
                    },
                });
                enqueueSnackbar(
                    `Emissão do Termo de Aceitação de ${respostaServico.dados.descricao} no SEI realizada com sucesso`,
                    {
                        variant: 'success',
                    },
                );
            }
        } catch (e) {
            enqueueSnackbar(formataMensagemErro(e), {
                variant: 'error',
            });
            console.error(e);
        } finally {
            emEspera(false);
        }
    };

    //Habilitação de ações
    const pode = getAcoesEtapaOrdemServico(TipoUsoPermissoes.HABILITAR_UI, etapa, osState.dado, tipoOrdemServico);

    return (
        <TableRow className={etapa.hasOwnProperty('toDelete') ? privateClasses.deleted : privateClasses.notDeleted}>
            <TableCell scope="row" key={`tdDescricao${i}`} style={{paddingBottom: '0px'}}>
                {etapa.descricao}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdIniPlan${i}`}>
                {formataDataStringLocal(etapa.dtInicioPlanejada)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtFimPlan${i}`}>
                {formataDataStringLocal(etapa.dtFimPlanejada)}
            </TableCell>
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <TableCell align="center" scope="row" key={`tdVlAdiantamentoPlan${i}`}>
                    {formataNumeroStringLocal(etapa.valorAdiantamentoPlanejado || 0, true)}
                </TableCell>
            )}
            <TableCell align="center" scope="row" key={`tdDtIniReal${i}`}>
                {formataDataStringLocal(etapa.dtInicioReal)}
            </TableCell>
            <TableCell align="center" scope="row" key={`tdDtFimReal${i}`}>
                {formataDataStringLocal(etapa.dtFimReal)}
            </TableCell>
            {tipoOrdemServico?.termoAceitacaoEmitidoPorEtapa && (
                <TableCell align="center" scope="row" key={`tdVlAdiantamentoReal${i}`}>
                    {etapa.valorAdiantamentoReal
                        ? formataNumeroStringLocal(etapa.valorAdiantamentoReal || 0, true)
                        : ''}
                </TableCell>
            )}
            <TableCell scope="row" key={`tdAcoes${i}`} align="right">
                {(pode.editarPlanejamento().ok || pode.editarRealizado().ok) && (
                    <Tooltip title="Editar Etapa">
                        <IconButton
                            key={`buttonEdit${i}`}
                            aria-label="Editar Etapa"
                            color="primary"
                            size="small"
                            disabled={etapa.hasOwnProperty('toDelete')}
                            onClick={funcaoEditar}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {pode.emitirTermoAceitacaoSEI().ok && (
                    <Tooltip title="Emitir Termo de Aceitação no SEI">
                        <IconButton
                            aria-label="Emitir Termo de Aceitação no SEI"
                            color="primary"
                            size="small"
                            disabled={
                                etapa.hasOwnProperty('toDelete') ||
                                etapa.dtInicioReal == null ||
                                etapa.dtFimReal == null
                            }
                            onClick={emitirTermoAceitacao.bind(null, etapa)}
                        >
                            <DescriptionIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {pode.irParaTermoAceitacaoSEI().ok && (
                    <Tooltip title="Visualizar Termo de Aceitação no SEI">
                        <IconButton
                            aria-label="Visualizar Termo de Aceitação no SEI"
                            color="primary"
                            size="small"
                            disabled={
                                etapa.hasOwnProperty('toDelete') ||
                                etapa.dtInicioReal == null ||
                                etapa.dtFimReal == null
                            }
                            onClick={() => {
                                window.open(etapa.linkTermoAceitacaoSEI, '_blank');
                            }}
                        >
                            <FindInPageIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {pode.remover().ok && (
                    <Tooltip title="Remover Etapa">
                        <IconButton
                            key={`buttonRemove${i}`}
                            aria-label="Remover Etapa"
                            color="primary"
                            size="small"
                            disabled={etapa.hasOwnProperty('toDelete')}
                            onClick={funcaoRemover}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </TableCell>
        </TableRow>
    );
};
