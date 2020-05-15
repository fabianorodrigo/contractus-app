import {makeStyles, TextField} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {OrdemServico, OrdemServicoFull} from '../../../models';
import {getStatusOrdemServico} from '../../../models/getStatusOrdemServico';
import {StatusOrdemServico} from '../../../models/StatusOrdemServico';
import {ActionEntity, ActionType, AppContext, AppContextStoreType, AppDispatch} from '../../App-Context';
import {EditionType, IEntidadeContexto} from '../../models/EntidadeContext';
import {ContratosMap, FornecedoresMap, OrdensServicoMap} from '../../models/TypeContext';
import {deleteOrdemServico, emitirOrdemServicoSEI, getOrdemServico, getOrdensServico} from '../../services/backend';
import {formataMensagemErro, formataMensagemErroLoopback} from '../../services/formatacaoMensagensErro';
import {RespostaServico} from '../../services/restService';
import {DialogConfirmacao} from '../lib/dialogConfirmacao';
import {ToolbarInterna} from '../toolbarInterna';
import {OrdemServicoContext} from './context';
import {FormOrdemServico} from './form';
import {getTipoOrdemServico} from './getTipoOrdemServico';
import {ListaCartoesOrdensServico} from './listaCartoes';
import {TabelaOrdensServico} from './tabela';

const privateUseStyles = makeStyles({
    underline: {
        '&&&:before': {
            borderBottom: 'none',
        },
        '&&:after': {
            borderBottom: 'none',
        },
    },
});

export const OrdensServico: React.FC<{}> = ({}) => {
    const classeFiltroContratoFormControl = privateUseStyles();
    //TIP: A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {
        state: appState,
        dispatch: appDispatch,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<AppDispatch>;
    } = useContext(AppContext);
    const fornecedores: FornecedoresMap = appState.fornecedores;
    const contratos: ContratosMap = appState.contratos;
    const ordensServico: OrdensServicoMap = appState.ordensServico;
    const {state: osState, dispatch: osDispatch}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);
    //Função que para setar o state que coloca o BackDrop na frente da tela com o indicador de progresso ativo
    const emEspera = (emEspera: boolean) => {
        appDispatch({
            tipo: ActionType.EM_ESPERA,
            dados: emEspera,
        });
    };

    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens

    //### Controlando filtro de OS's por contrato
    const [idContratoSelecionado, setIdContratoSelecionado] = React.useState<number>(-1);
    const onChangeContrato = (event: React.ChangeEvent<{value: unknown}>) => {
        setIdContratoSelecionado(parseInt(event.target.value as string));
    };

    //funcao para tratar chamadas assíncronas a serviços
    const getRespostaServico = async function <T>(funcaoBackend: Function): Promise<RespostaServico<T>> {
        try {
            emEspera(true);
            const respostaServico = await funcaoBackend();
            if (!respostaServico.sucesso) {
                enqueueSnackbar(formataMensagemErroLoopback((respostaServico.dados as any).error), {
                    variant: 'error',
                });
                console.error(respostaServico.dados);
                console.warn(osState.dado);
            }
            return respostaServico;
        } catch (e) {
            enqueueSnackbar(formataMensagemErro(e), {
                variant: 'error',
            });
            console.error(e);
            return {sucesso: false, dados: {} as T};
        } finally {
            emEspera(false);
        }
    };

    //Busca avalia a busca sempre que selecionar um contrato
    React.useEffect(() => {
        if (idContratoSelecionado != -1) {
            //Para conseguir executar await dentro de useEffect, a solução é
            //criar uma função async que tenha o await dentro dela, e depois
            //invocá-la
            let respostaServico: RespostaServico<OrdemServico[]>;
            async function buscaOSs() {
                respostaServico = await getRespostaServico<OrdemServico[]>(
                    getOrdensServico.bind(null, idContratoSelecionado),
                );
                if (respostaServico.sucesso) {
                    const ordens = respostaServico.dados;
                    ordens.forEach((o) => {
                        appDispatch({
                            tipo: ActionType.INCLUIR,
                            entidade: ActionEntity.ORDEM_SERVICO,
                            dados: o,
                        });
                    });
                }
            }
            buscaOSs();
        }
    }, [idContratoSelecionado]);
    //### Controle do Tipo de visualização
    const [visaoSelecionada, setVisaoSelecionada] = React.useState<'grid' | 'cards'>('grid');
    const onChangeVisao = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'grid' ? setVisaoSelecionada('grid') : setVisaoSelecionada('cards');
    };
    //### Controle da ordem de serviço visualizada/em edição
    const abrirDialog = async (ordemServico: OrdemServicoFull) => {
        //Se OS já existe (tem id), busca todos os dados incluindo as relations da ordem de serviço
        if (ordemServico && ordemServico.id) {
            const respostaServico = await getRespostaServico<OrdemServicoFull>(
                getOrdemServico.bind(null, ordemServico.id as number),
            );
            if (respostaServico.sucesso) {
                ordemServico = respostaServico.dados;
                //atualiza na state da aplicação os dados completos
                appDispatch({
                    tipo: ActionType.INCLUIR,
                    entidade: ActionEntity.ORDEM_SERVICO,
                    dados: ordemServico,
                });
                //atualiza o state do contexto da ordem de serviço com a ordem sendo editada
                osDispatch({tipo: EditionType.EDITAR, dado: ordemServico});
            }
        } else {
            //atualiza o state do contexto uma ordem de serviço em branco
            osDispatch({tipo: EditionType.NOVO});
        }
        //setOrdemServicoEditada(ordemCompleta);
    };
    //Exclusão de rascunhos de ordem de serviço
    const [mensagemDialogExclusao, setMensagemDialogExclusao] = React.useState<string>('');
    const [detalhesMensagem, setDetalhesMensagem] = React.useState<Array<string>>([]);
    const [idOSExcluir, setIdOSExcluir] = React.useState<number | undefined>(undefined);
    const excluirOrdemServico = async (ordemServico: OrdemServicoFull) => {
        const respostaServico = await getRespostaServico<OrdemServicoFull>(
            getOrdemServico.bind(null, ordemServico.id as number),
        );
        if (respostaServico.sucesso) {
            ordemServico = respostaServico.dados;
            if (getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO) {
                //guarda o id da OS a se excluir
                setIdOSExcluir(ordemServico.id);
                //Ao setar uma mensagem, o dialog aparece
                setMensagemDialogExclusao(`Confirma exclusão do rascunho de ordem de serviço?`);
                //Setar detalhes da mensagem
                setDetalhesMensagem([
                    `Contrato: ${contratos[ordemServico.idContrato].numeroContrato}/${
                        contratos[ordemServico.idContrato].anoContrato
                    } - ${fornecedores[contratos[ordemServico.idContrato].idFornecedor]?.apelido}`,
                    `Tipo da Ordem de Serviço: ${getTipoOrdemServico(ordemServico, contratos)?.descricao}`,
                    `Requisitante: ${ordemServico.nomeRequisitante}`,
                    `Fiscal Técnico: ${ordemServico.nomeFiscalTecnico}`,
                    `Produto: ${ordemServico.idProduto ? ordemServico.idProduto : ''}`,
                    `Projeto: ${ordemServico.idProjeto ? ordemServico.idProjeto : ''}`,
                ]);
            } else {
                appDispatch({
                    tipo: ActionType.INCLUIR,
                    entidade: ActionEntity.ORDEM_SERVICO,
                    dados: ordemServico,
                });
            }
        }
    };
    //Emissão de OS no SEI enquanto rascunhos de ordem de serviço
    const [mensagemDialogEmissao, setMensagemDialogEmissao] = React.useState<string>('');
    const [idOSEmitir, setIdOSEmitir] = React.useState<number | undefined>(undefined);
    const emitirOSSEI = async (ordemServico: OrdemServicoFull) => {
        const respostaServico = await getRespostaServico<OrdemServicoFull>(
            getOrdemServico.bind(null, ordemServico.id as number),
        );
        if (respostaServico.sucesso) {
            ordemServico = respostaServico.dados;
            if (getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO) {
                //guarda o id da OS a se emitir no SEI
                setIdOSEmitir(ordemServico.id);
                //Ao setar uma mensagem, o dialog aparece
                setMensagemDialogEmissao(`Confirma emissão da Ordem de Serviço no SEI?`);
                //Setar detalhes da mensagem
                setDetalhesMensagem([
                    `Contrato: ${contratos[ordemServico.idContrato].numeroContrato}/${
                        contratos[ordemServico.idContrato].anoContrato
                    } - ${fornecedores[contratos[ordemServico.idContrato].idFornecedor]?.apelido}`,
                    `Tipo da Ordem de Serviço: ${getTipoOrdemServico(ordemServico, contratos)?.descricao}`,
                    `Requisitante: ${ordemServico.nomeRequisitante}`,
                    `Fiscal Técnico: ${ordemServico.nomeFiscalTecnico}`,
                    `Produto: ${ordemServico.idProduto ? ordemServico.idProduto : ''}`,
                    `Projeto: ${ordemServico.idProjeto ? ordemServico.idProjeto : ''}`,
                ]);
            } else {
                appDispatch({
                    tipo: ActionType.INCLUIR,
                    entidade: ActionEntity.ORDEM_SERVICO,
                    dados: ordemServico,
                });
            }
        }
    };
    return (
        <React.Fragment>
            <DialogConfirmacao
                mensagem={mensagemDialogExclusao}
                detalhesMensagem={detalhesMensagem}
                funcaoFecharCallback={async (sim: boolean) => {
                    if (sim) {
                        const respostaServico = await getRespostaServico<void>(
                            deleteOrdemServico.bind(null, idOSExcluir as number),
                        );
                        if (respostaServico.sucesso) {
                            appDispatch({
                                tipo: ActionType.REMOVER,
                                entidade: ActionEntity.ORDEM_SERVICO,
                                dados: appState.ordensServico[idOSExcluir as number],
                            });
                            enqueueSnackbar(`Exclusão realizada com sucesso`, {
                                variant: 'success',
                            });
                        }
                    }
                    //ZERA o id da OS a se excluir
                    setIdOSExcluir(undefined);
                    setMensagemDialogExclusao('');
                }}
            />
            <DialogConfirmacao
                mensagem={mensagemDialogEmissao}
                detalhesMensagem={detalhesMensagem}
                funcaoFecharCallback={async (sim: boolean) => {
                    setMensagemDialogEmissao('');
                    if (sim) {
                        const respostaServico = await getRespostaServico<OrdemServicoFull>(
                            emitirOrdemServicoSEI.bind(null, ordensServico[idOSEmitir as number]),
                        );
                        if (respostaServico.sucesso) {
                            appDispatch({
                                tipo: ActionType.INCLUIR,
                                entidade: ActionEntity.ORDEM_SERVICO,
                                dados: respostaServico.dados,
                            });
                            enqueueSnackbar(
                                `Emissão da Ordem de Serviço ${String(respostaServico.dados.numero).padStart(
                                    3,
                                    '0',
                                )} no SEI realizada com sucesso`,
                                {
                                    variant: 'success',
                                },
                            );
                        }
                    }
                    //ZERA o id da OS a se excluir
                    setIdOSEmitir(undefined);
                }}
            />
            <ToolbarInterna
                key="toolBarOrdemServico"
                onChangeVisao={onChangeVisao}
                visaoSelecionada={visaoSelecionada}
                labelNovo="Nova Ordem de Serviço"
                funcaoNovoOnClick={abrirDialog}
            >
                <TextField
                    InputProps={{
                        classes: classeFiltroContratoFormControl,
                    }}
                    id="idContratoSelecionado"
                    key="tfIdContratoSelecionado"
                    select
                    label="Contrato"
                    value={idContratoSelecionado}
                    onChange={onChangeContrato}
                    style={{minWidth: '20%'}}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option key="idContratoSelecionado-option-null" value={-1}>
                        Selecione
                    </option>
                    {Object.values(contratos).map((contrato) => (
                        <option key={`idContratoSelecionado-option-${contrato.id}`} value={contrato.id}>
                            {contrato.numeroContrato}/{contrato.anoContrato} -{' '}
                            {fornecedores[contrato.idFornecedor]?.apelido}
                        </option>
                    ))}
                </TextField>
            </ToolbarInterna>
            {visaoSelecionada == 'cards' && (
                <ListaCartoesOrdensServico key="listaOSs" idContratoSelecionado={idContratoSelecionado} />
            )}
            {visaoSelecionada == 'grid' && (
                <TabelaOrdensServico
                    key="tabelaOSs"
                    idContratoSelecionado={idContratoSelecionado}
                    funcaoVisualizar={abrirDialog}
                    funcaoExcluir={excluirOrdemServico}
                    funcaoEmitirOSSEI={emitirOSSEI}
                />
            )}
            {osState.editando && <FormOrdemServico key="formOSs" />}
        </React.Fragment>
    );
};
