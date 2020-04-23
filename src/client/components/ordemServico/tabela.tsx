import {IconButton} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {AppContext, AppContextStoreType} from '../../App-Context';
import {ContratosMap, OrdensServicoMap} from '../../models/TypeContext';
import {TypeOrdemServico_Void} from '../../models/TypeFunctions';
import {encurtaNome, formataDataStringLocal} from '../../services/formatacao';
import {SearchIcon} from '../lib/icons';
import {Tabela, TabelaColunaDado} from '../lib/tabela';

export const TabelaOrdensServico: React.FC<{
    idContratoSelecionado: number;
    funcaoVisualizar: TypeOrdemServico_Void;
}> = ({idContratoSelecionado, funcaoVisualizar}) => {
    //Buscando dados
    //TIP REACT: A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {
        state: appState,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<any>;
    } = useContext(AppContext);
    const contratos: ContratosMap = appState.contratos;
    const ordens: OrdensServicoMap = appState.ordensServico;
    const ordensContrato = Object.values(ordens).filter((o) => o.idContrato == idContratoSelecionado);

    function getTipoOrdemServico(idTipoOrdemServicoContrato: number) {
        return contratos[idContratoSelecionado]
            ? contratos[idContratoSelecionado].tiposOrdemServico.filter(
                  (tos) => tos.id == idTipoOrdemServicoContrato,
              )[0].descricao
            : [];
    }
    function formataNumeroOS(numero: number) {
        return numero ? String(numero).padStart(3, '0') : '-';
    }

    const colunas: TabelaColunaDado[] = [];
    colunas.push({
        atributo: 'numero',
        titulo: '#',
        funcaoFormatacao: formataNumeroOS,
    });
    colunas.push({
        atributo: 'idTipoOrdemServicoContrato',
        titulo: 'Tipo',
        funcaoFormatacao: getTipoOrdemServico,
    });
    colunas.push({
        atributo: 'dtEmissao',
        titulo: 'Emissão',
        funcaoFormatacao: formataDataStringLocal,
    });
    colunas.push({atributo: 'idProduto', titulo: 'Produto'});
    colunas.push({
        atributo: 'nomeRequisitante',
        titulo: 'Fiscal Requisitante',
        funcaoFormatacao: encurtaNome,
    });
    colunas.push({
        atributo: 'nomeFiscalTecnico',
        titulo: 'Fiscal Técnico',
        funcaoFormatacao: encurtaNome,
    });

    return (
        <Tabela
            colunas={colunas}
            dados={ordensContrato}
            colunasAcao={ordensContrato.map((oc) => {
                return (
                    <IconButton aria-label="Visualizar" color="secondary" size="small">
                        <SearchIcon fontSize="small" onClick={funcaoVisualizar.bind(null, oc)} />
                    </IconButton>
                );
            })}
        />
    );
};
