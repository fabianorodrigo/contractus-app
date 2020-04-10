import {createStyles, makeStyles, TextField} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {OrdemServico} from '../../../models';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from '../../App-Context';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {getOrdensServico} from '../../services/backend';
import {ToolbarInterna} from '../toolbarInterna';
import {FormOrdemServico} from './form';
import {ListaCartoesOrdensServico} from './listaCartoes';
import {TabelaOrdensServico} from './tabela';

const privateUseStyles = makeStyles(() =>
    createStyles({
        filtroContratoFormControl: {
            minWidth: 120,
        },
    }),
);

export const OrdensServico: React.FC<{}> = ({}) => {
    const privateClasses = privateUseStyles();
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
            getOrdensServico(idContratoSelecionado).then(ordens => {
                ordens.forEach(o => {
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
    const abrirDialog = (ordemServico: OrdemServico) => {
        setOrdemServicoEditada(ordemServico);
    };
    const fecharDialog = (ordemServico: OrdemServico) => {
        setOrdemServicoEditada(null);
    };

    return (
        <React.Fragment>
            <ToolbarInterna
                onChangeVisao={onChangeVisao}
                visaoSelecionada={visaoSelecionada}
                labelNovo="Nova Ordem de Serviço"
            >
                <TextField
                    className={privateClasses.filtroContratoFormControl}
                    id="idContratoSelecionado"
                    select
                    label="Contrato"
                    value={idContratoSelecionado}
                    onChange={onChangeContrato}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    <option key="idContratoSelecionado-option-null" value={-1}>
                        Selecione
                    </option>
                    {Object.values(contratos).map(contrato => (
                        <option key={`idContratoSelecionado-option-${contrato.id}`} value={contrato.id}>
                            {contrato.numeroContrato}/{contrato.anoContrato} -{' '}
                            {fornecedores[contrato.idFornecedor].apelido}
                        </option>
                    ))}
                </TextField>
            </ToolbarInterna>
            {visaoSelecionada == 'cards' && <ListaCartoesOrdensServico idContratoSelecionado={idContratoSelecionado} />}
            {visaoSelecionada == 'grid' && (
                <TabelaOrdensServico idContratoSelecionado={idContratoSelecionado} funcaoVisualizar={abrirDialog} />
            )}
            {ordemServicoEditada && (
                <FormOrdemServico ordemServico={ordemServicoEditada} funcaoFecharForm={fecharDialog} />
            )}
        </React.Fragment>
    );
};
