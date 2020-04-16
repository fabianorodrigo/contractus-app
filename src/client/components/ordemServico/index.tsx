import {makeStyles, TextField} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {OrdemServico} from '../../../models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from '../../App-Context';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {getOrdemServico, getOrdensServico} from '../../services/backend';
import {ToolbarInterna} from '../toolbarInterna';
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
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const fornecedores: FornecedoresMap = state.fornecedores;
    const contratos: ContratosMap = state.contratos;
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
                    dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.ORDEM_SERVICO, dados: o});
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
    let [ordemServicoEditada, setOrdemServicoEditada]: any = React.useState();
    const abrirDialog = async (ordemServico: OrdemServico) => {
        let ordemCompleta = {};
        //Busca todos os dados incluindo as relations da ordem de serviço
        if (ordemServico && ordemServico.id) {
            ordemCompleta = await getOrdemServico(ordemServico.id as number);
        } else {
            //ordemCompleta = new OrdemServicoFull({});
        }
        dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.ORDEM_SERVICO, dados: ordemCompleta});
        setOrdemServicoEditada(ordemCompleta);
    };
    const fecharDialog = () => {
        setOrdemServicoEditada(null);
    };

    return (
        <React.Fragment key="fragmentOSindex">
            <ToolbarInterna
                key="toolBarOrdemServico"
                onChangeVisao={onChangeVisao}
                visaoSelecionada={visaoSelecionada}
                labelNovo="Nova Ordem de Serviço"
                funcaoNovoOnClick={abrirDialog}
            >
                <TextField
                    InputProps={{classes: classeFiltroContratoFormControl}}
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
            {ordemServicoEditada && (
                <FormOrdemServico key="formOSs" ordemServico={ordemServicoEditada} funcaoFecharForm={fecharDialog} />
            )}
        </React.Fragment>
    );
};
