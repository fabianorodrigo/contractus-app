import {IconButton, Link, Tooltip} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {getAcoesOrdemServico, tem, TipoUsoPermissoes} from '../../../commonLib';
import {encurtaNome, formataDataStringLocal} from '../../../commonLib/formatacao';
import {ContratosMap, OrdensServicoMap} from '../../../commonLib/interface-models/maps-entidades-types';
import {AppContext, AppContextStoreType} from '../../App-Context';
import {TypeOrdemServico_Void} from '../../models/TypeFunctions';
import {DeleteIcon, DescriptionIcon, FindInPageIcon, ReceiptIcon, SearchIcon} from '../lib/icons';
import {Tabela, TabelaColunaDado} from '../lib/tabela';

export const TabelaOrdensServico: React.FC<{
    idContratoSelecionado: number;
    funcaoVisualizar: TypeOrdemServico_Void;
    funcaoExcluir: TypeOrdemServico_Void;
    funcaoEmitirOSSEI: TypeOrdemServico_Void;
    funcaoEmitirTermoRecebimento: TypeOrdemServico_Void;
}> = ({idContratoSelecionado, funcaoVisualizar, funcaoExcluir, funcaoEmitirOSSEI, funcaoEmitirTermoRecebimento}) => {
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
    const ordensContrato = Object.values(ordens)
        .filter((o) => o.idContrato == idContratoSelecionado)
        .sort((a, b) => {
            if (!tem(a.numero) && !tem(b.numero)) return 0;
            if (!tem(a.numero) && tem(b.numero)) return -1;
            if (tem(a.numero) && !tem(b.numero)) return 1;
            return (b.numero as number) - (a.numero as number);
        }); //filtrando pelo contrato selecionado e ordenando pelo número da OS decrescente (sem número vêm na frente)

    function getTipoOrdemServico(idTipoOrdemServicoContrato: number) {
        return contratos[idContratoSelecionado]
            ? contratos[idContratoSelecionado].tiposOrdemServico.filter(
                  (tos) => tos.id == idTipoOrdemServicoContrato,
              )[0].descricao
            : [];
    }
    function formataNumeroOS(numero: number, link: string) {
        return numero ? (
            <Link id="linkNumeroSEI" href={link} target="_blank">
                {String(numero).padStart(3, '0')}
            </Link>
        ) : (
            '-'
        );
    }

    const colunas: TabelaColunaDado[] = [];
    colunas.push({
        atributo: 'numero',
        titulo: '#',
        funcaoFormatacao: formataNumeroOS,
        atributoAdicionalFormatacao: 'linkOrdemServicoSEI',
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
                //Habilitação de ações
                const pode = getAcoesOrdemServico(TipoUsoPermissoes.HABILITAR_UI, oc);
                return (
                    <React.Fragment>
                        <Tooltip title="Visualizar">
                            <IconButton aria-label="Visualizar" color="primary" size="small">
                                <SearchIcon fontSize="small" onClick={funcaoVisualizar.bind(null, oc)} />
                            </IconButton>
                        </Tooltip>
                        {pode.excluir().ok && (
                            <Tooltip title="Excluir">
                                <IconButton aria-label="Excluir" color="primary" size="small">
                                    <DeleteIcon fontSize="small" onClick={funcaoExcluir.bind(null, oc)} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {pode.emitirSEI().ok && (
                            <Tooltip title="Emitir Ordem de Serviço no SEI">
                                <IconButton aria-label="Emitir Ordem de Serviço no SEI" color="primary" size="small">
                                    <DescriptionIcon fontSize="small" onClick={funcaoEmitirOSSEI.bind(null, oc)} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {pode.irParaSEI().ok && (
                            <Tooltip title="Visualizar Ordem de Serviço no SEI">
                                <IconButton
                                    aria-label="Visualizar Ordem de Serviço no SEI"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        window.open(oc.linkOrdemServicoSEI, '_blank');
                                    }}
                                >
                                    <FindInPageIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        {pode.emitirTRPSEI().ok && (
                            <Tooltip title="Emitir Termo de Recebimento">
                                <IconButton
                                    aria-label="Emitir Termo de Recebimento"
                                    color="primary"
                                    size="small"
                                    onClick={funcaoEmitirTermoRecebimento.bind(null, oc)}
                                >
                                    <ReceiptIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </React.Fragment>
                );
            })}
        />
    );
};
