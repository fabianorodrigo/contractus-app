import {makeStyles, TextField} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {OrdemServicoFull} from '../../../models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType, AppDispatch} from '../../App-Context';
import {EditionType, IEntidadeContexto} from '../../models/EntidadeContext';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {getOrdemServico, getOrdensServico} from '../../services/backend';
import {ToolbarInterna} from '../toolbarInterna';
import {OrdemServicoContext} from './context';
import {FormOrdemServico} from './form';
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
    //Buscando contratos
    //TIP: A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {
        state: appState,
        dispatch,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<AppDispatch>;
    } = useContext(AppContext);
    const fornecedores: FornecedoresMap = appState.fornecedores;
    const contratos: ContratosMap = appState.contratos;
    const {state: osState, dispatch: osDispatch}: IEntidadeContexto<OrdemServicoFull> = useContext(OrdemServicoContext);

    //### Controlando filtro de OS's por contrato
    const [idContratoSelecionado, setIdContratoSelecionado] = React.useState<number>(-1);
    const onChangeContrato = (event: React.ChangeEvent<{value: unknown}>) => {
        setIdContratoSelecionado(parseInt(event.target.value as string));
    };
    //Busca avalia a busca sempre que selecionar um contrato
    React.useEffect(() => {
        if (idContratoSelecionado != -1) {
            getOrdensServico(idContratoSelecionado).then((ordens) => {
                ordens.forEach((o) => {
                    dispatch({
                        tipo: ActionType.INCLUIR,
                        entidade: ActionEntity.ORDEM_SERVICO,
                        dados: o,
                    });
                });
            });
        }
    }, [idContratoSelecionado]);
    //### Controle do Tipo de visualização
    const [visaoSelecionada, setVisaoSelecionada] = React.useState<'grid' | 'cards'>('grid');
    const onChangeVisao = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'grid' ? setVisaoSelecionada('grid') : setVisaoSelecionada('cards');
    };
    //### Controle da ordem de serviço visualizada/em edição
    const abrirDialog = async (ordemServico: OrdemServicoFull) => {
        console.log(ordemServico);
        //Se OS já existe (tem id), busca todos os dados incluindo as relations da ordem de serviço
        if (ordemServico && ordemServico.id) {
            ordemServico = await getOrdemServico(ordemServico.id as number);
            //atualiza na state da aplicação os dados completos
            dispatch({
                tipo: ActionType.INCLUIR,
                entidade: ActionEntity.ORDEM_SERVICO,
                dados: ordemServico,
            });
            //atualiza o state do contexto da ordem de serviço com a ordem sendo editada
            osDispatch({tipo: EditionType.EDITAR, dado: ordemServico});
        } else {
            //atualiza o state do contexto uma ordem de serviço em branco
            osDispatch({tipo: EditionType.NOVO});
        }
        //setOrdemServicoEditada(ordemCompleta);
    };
    return (
        <React.Fragment>
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
                />
            )}
            {osState.editando && <FormOrdemServico key="formOSs" />}
        </React.Fragment>
    );
};
