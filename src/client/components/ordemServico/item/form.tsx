import {Grid, IconButton} from '@material-ui/core';
import React from 'react';
import {ItemOrdemServico, MetricaContrato, OrdemServico} from '../../../../models';
import {StatusOrdemServico} from '../../../../models/StatusOrdemServico';
import {useFormHook} from '../../../customHooks/useForm';
import {CampoLista} from '../../lib/campoLista';
import {CampoTexto} from '../../lib/campoTexto';
import {AddIcon, ClearIcon} from '../../lib/icons';
export const FormItemOrdensServico: React.FC<{
    ordemServico: OrdemServico;
    metricasContrato: MetricaContrato[];
    statusOrdemServico: number;
    onSubmitItem: Function;
    fechaFormItem: Function;
    inputRef?: React.RefObject<HTMLInputElement>;
}> = (props) => {
    const {ordemServico, metricasContrato, statusOrdemServico, onSubmitItem, fechaFormItem, inputRef} = props;
    const [errosInput, setErrosInput] = React.useState({
        descricao: '',
        siglaMetrica: '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: '',
        quantidadeReal: '',
        valorUnitarioReal: '',
    });

    const valida = (item: ItemOrdemServico) => {
        errosInput.descricao =
            item.descricao == null || item.descricao.trim() == '' ? 'Uma descrição do serviço deve ser informada' : '';
        errosInput.siglaMetrica =
            item.siglaMetrica == null || item.siglaMetrica.trim() == ''
                ? 'A unidade do serviço deve ser informada'
                : '';
        errosInput.quantidadeEstimada =
            item.quantidadeEstimada <= 0 ? 'O quantitavo do serviço deve ser informado' : '';
        errosInput.valorUnitarioEstimado =
            item.valorUnitarioEstimado <= 0 ? 'O valor unitário do serviço deve ser informado' : '';

        if (Object.values(errosInput).every((v) => v == '')) {
            onSubmitItem(item);
            limpaForm();
        } else {
            setErrosInput({...errosInput});
        }
    };
    console.log(2, 'metricasContrato.length', metricasContrato.length);
    const {inputs, onInputChange, onSubmit} = useFormHook(valida, {
        idOrdemServico: ordemServico.id,
        descricao: '',
        siglaMetrica: metricasContrato.length > 0 ? metricasContrato[0].sigla : '',
        quantidadeEstimada: '',
        valorUnitarioEstimado: metricasContrato.length > 0 ? metricasContrato[0].valorUnitario : '',
    });
    const limpaForm = () => {
        inputs.descricao = '';
        inputs.siglaMetrica = '';
        inputs.quantidadeEstimada = '';
        inputs.valorUnitarioEstimado = '';
    };
    console.log(4, 'renderizou', metricasContrato, ordemServico, inputs);
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
                    error={errosInput.descricao != ''}
                    inputRef={inputRef}
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
                    defaultValue={metricasContrato.length > 0 ? metricasContrato[0].sigla : ''}
                    error={errosInput.siglaMetrica != ''}
                    opcoes={metricasContrato.map((metrica) => {
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
                    error={errosInput.quantidadeEstimada != ''}
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
                    error={errosInput.valorUnitarioEstimado != ''}
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
                    error={errosInput.quantidadeReal != ''}
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
                    error={errosInput.valorUnitarioReal != ''}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton key={`buttonAddItem`} size="small" onClick={onSubmit}>
                    <AddIcon aria-label="Adicionar" color="primary" fontSize="small" />
                </IconButton>
                <IconButton
                    key={`buttonClearItem`}
                    size="small"
                    onClick={() => {
                        limpaForm();
                        fechaFormItem();
                    }}
                >
                    <ClearIcon aria-label="Cancelar" fontSize="small" color="error" />
                </IconButton>
            </Grid>
        </Grid>
    );
};
