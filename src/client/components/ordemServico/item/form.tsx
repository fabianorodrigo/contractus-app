import {Grid, IconButton} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {ItemOrdemServico, OrdemServico} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {AppContext, AppContextStoreType} from '../../../App-Context';
import {useFormHook} from '../../../customHooks/useForm';
import {ContratosMap} from '../../../models/TypeContext';
import {CampoLista} from '../../lib/campoLista';
import {CampoTexto} from '../../lib/campoTexto';
import {AddIcon, ClearIcon} from '../../lib/icons';
export const FormItemOrdensServico: React.FC<{
    ordemServico: OrdemServico;
    statusOrdemServico: number;
    onSubmitItem: Function;
    fechaFormItem: Function;
}> = (props) => {
    const {ordemServico, statusOrdemServico, onSubmitItem, fechaFormItem} = props;
    //Buscando dados
    const {state}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const contratos: ContratosMap = state.contratos;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
        quantidadeReal: '',
        valorUnitarioReal: '',
    });

    const valida = (item: ItemOrdemServico) => {
        let valido = true;
        if (item.descricao.trim() == '') {
            errosInput.descricao = 'Uma descrição do serviço deve ser informada';
            valido = false;
        }
        if (item.siglaMetrica.trim() == '') {
            errosInput.siglaMetrica = 'A unidade do serviço deve ser informada';
            valido = false;
        }
        if (item.quantidadeEstimada <= 0) {
            errosInput.quantidadeEstimada = 'O quantitavo do serviço deve ser informado';
            valido = false;
        }
        if (item.valorUnitarioEstimado <= 0) {
            errosInput.valorUnitarioEstimado = 'O valor unitário do serviço deve ser informado';
            valido = false;
        }
        if (valido) {
            limpaForm();
            onSubmitItem(item);
        }
        console.log(errosInput);
        setErrosInput(errosInput);
    };

    const {inputs, onInputChange, onSubmit} = useFormHook(valida, {
        idOrdemServico: ordemServico.id,
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
    });
    const limpaForm = () => {
        inputs.descricao = '';
        inputs.siglaMetrica = '';
        inputs.quantidadeEstimada = '';
        inputs.valorUnitarioEstimado = '';
    };

    return (
        <Grid container>
            <Grid item xs={4}>
                <CampoTexto
                    fullWidth={true}
                    atributo="descricao"
                    label="Descrição"
                    objetoValor={inputs}
                    somenteLeitura={statusOrdemServico > StatusOrdemServico.RASCUNHO}
                    obrigatorio={true}
                    onChange={onInputChange}
                    helperText={errosInput.descricao}
                />
            </Grid>
            <Grid item xs={1}>
                <CampoLista
                    atributo="siglaMetrica"
                    label="Unidade"
                    objetoValor={inputs}
                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    defaultValue={contratos[ordemServico.idContrato].metricas[0].sigla}
                    helperText={errosInput.siglaMetrica}
                    opcoes={Object.values(contratos[ordemServico.idContrato].metricas).map((metrica) => {
                        return {
                            valor: metrica.sigla,
                            label: metrica.sigla,
                        };
                    })}
                ></CampoLista>
            </Grid>
            <Grid item xs={1}>
                <CampoTexto
                    fullWidth={true}
                    atributo="quantidadeEstimada"
                    label="Quantidade"
                    objetoValor={inputs}
                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    helperText={errosInput.quantidadeEstimada}
                />
            </Grid>
            <Grid item xs={2}>
                <CampoTexto
                    fullWidth={true}
                    atributo="valorUnitarioEstimado"
                    label="Valor Unitário"
                    objetoValor={inputs}
                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico != null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    helperText={errosInput.valorUnitarioEstimado}
                />
            </Grid>
            <Grid item xs={1}>
                <CampoTexto
                    fullWidth={true}
                    atributo="quantidadeReal"
                    label="Qtd Real"
                    objetoValor={inputs}
                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico == null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    helperText={errosInput.quantidadeReal}
                />
            </Grid>
            <Grid item xs={2}>
                <CampoTexto
                    fullWidth={true}
                    atributo="valorUnitarioReal"
                    label="Valor Unitário Real"
                    objetoValor={inputs}
                    somenteLeitura={inputs.numeroDocumentoSEIOrdemServico == null}
                    obrigatorio={true}
                    onChange={onInputChange}
                    type="number"
                    helperText={errosInput.valorUnitarioReal}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton key={`buttonAddItem`} color="primary" size="small">
                    <AddIcon aria-label="Adicionar" fontSize="small" onClick={onSubmit} />
                    <ClearIcon
                        aria-label="Cancelar"
                        fontSize="small"
                        color="error"
                        onClick={() => {
                            limpaForm();
                            fechaFormItem();
                        }}
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
};
