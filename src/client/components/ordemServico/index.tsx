import {createStyles, makeStyles, TextField, Theme} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from '../../App-Context';
import {ContratosMap, FornecedoresMap} from '../../models/TypeContext';
import {getOrdensServico} from '../../services/backend';
import useStyles from '../../services/styles';
import {ToolbarInterna} from '../toolbarInterna';
import {ListaCartoesOrdensServico} from './listaCartoes';
import {TabelaOrdensServico} from './tabela';

const privateUseStyles = makeStyles((theme: Theme) =>
    createStyles({
        filtroContratoFormControl: {
            minWidth: 120,
        },
    }),
);

export const OrdensServico: React.FC<{}> = ({}) => {
    const classes = useStyles();
    const privateClasses = privateUseStyles();
    //Buscando contratos
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const fornecedores: FornecedoresMap = state.fornecedores;
    const contratos: ContratosMap = state.contratos;

    const [idContratoSelecionado, setIdContratoSelecionado] = React.useState<number>(-1);
    const onChangeContrato = (event: React.ChangeEvent<{value: unknown}>) => {
        console.log('onchangecontrato', event.target.value);
        setIdContratoSelecionado(parseInt(event.target.value as string));
    };

    const [visaoSelecionada, setVisaoSelecionada] = React.useState<'grid' | 'cards'>('grid');
    const onChangeVisao = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'grid' ? setVisaoSelecionada('grid') : setVisaoSelecionada('cards');
    };

    //Busca avalia a busca sempre que selecionar um contrato
    React.useEffect(() => {
        getOrdensServico(idContratoSelecionado).then(ordens => {
            ordens.forEach(o => {
                console.debug(o);
                dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.ORDEM_SERVICO, dados: o}); //FIXME
            });
        });
    }, [idContratoSelecionado]);
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
                    {Object.values(contratos).map(contrato => (
                        <option key={contrato.id} value={contrato.id}>
                            {contrato.numeroContrato}/{contrato.anoContrato} -{' '}
                            {fornecedores[contrato.idFornecedor].apelido}
                        </option>
                    ))}
                </TextField>
            </ToolbarInterna>
            {visaoSelecionada == 'cards' && <ListaCartoesOrdensServico />}
            {visaoSelecionada == 'grid' && <TabelaOrdensServico />}
        </React.Fragment>
    );
};
