import React, {Dispatch, useContext} from 'react';
import {AppContext, AppContextStoreType} from '../../App-Context';
import {OrdensServicoMap} from '../../models/TypeContext';
import {encurtaNome, formataDataStringLocal} from '../../services/formatacao';
import {Tabela, TabelaColuna} from '../tabela';

export const TabelaOrdensServico: React.FC<{}> = ({}) => {
    //Buscando ordens
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const ordens: OrdensServicoMap = state.ordensServico;

    const colunas: TabelaColuna[] = [];
    colunas.push({atributo: 'numero', titulo: '#'});
    colunas.push({
        atributo: 'dtEmissao',
        titulo: 'Emissão',
        funcaoFormatacao: formataDataStringLocal,
    });
    colunas.push({atributo: 'idProduto', titulo: 'Produto'});
    colunas.push({atributo: 'nomeRequisitante', titulo: 'Fiscal Requisitante', funcaoFormatacao: encurtaNome});
    colunas.push({atributo: 'nomeFiscalTecnico', titulo: 'Fiscal Técnico', funcaoFormatacao: encurtaNome});

    return <Tabela colunas={colunas} dados={Object.values(ordens)} />;
};
