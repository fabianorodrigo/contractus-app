import moment, {DurationInputArg2} from 'moment';
import {formataNumeroStringLocal} from '../commonLib/formatacao';
import {AreaRequisitante, Contrato, Fornecedor, OrdemServico, TipoOrdemServicoContrato} from '../models';

export function getHTMLOrdemServicoSEI(
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
    fornecedor: Fornecedor,
    areaRequisitante: AreaRequisitante,
) {
    if (!tipoOrdemServico.templateOrdemServico)
        throw new Error(`Tipo de Ordem de Serviço não tem Template definido na base de dados`);
    //como teremos que alterar e incluir alguns valores da OS para passar para o template, clonamos
    const osFormatada = getOrdemServicoFormatadaToTemplate(ordemServico, tipoOrdemServico);
    ordemServico;

    const objRef: {[name: string]: any} = {
        os: osFormatada,
        contrato,
        tipoOrdemServico,
        fornecedor,
        areaRequisitante,
        projeto: {nome: ordemServico.idProjeto},
        produto: {nome: ordemServico.idProduto},
    };

    let htmlFinal = tipoOrdemServico.templateOrdemServico;
    const regex = /###([A-z0-9]+)\.([A-z0-9]+)(\.forEach\((.*?)\))?###/gms; //como os trechos que tem forEach podem quebrar linhas, temos que incluir a flag 's' - singleline
    let m: RegExpExecArray | null;

    while ((m = regex.exec(tipoOrdemServico.templateOrdemServico)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        //o elemento 0 tem de ### a ###
        //o elemento 1 tem o nome da entidade
        //o elemento 2 tem o nome da propriedade
        //o elemento 3 tem OU fechamento de "###", OU ".forEach(" até o fechamento "###" quando existir forEach
        //o elemento 4 tem  o conteúdo entre os parênterese do .forEach
        if (m[4] == undefined) {
            const subRE = new RegExp(m[0], 'g');
            if (objRef[m[1]]) {
                htmlFinal = htmlFinal.replace(subRE, objRef[m[1]][m[2]] ? objRef[m[1]][m[2]] : '');
            }
        } else {
            let tempItens = '';
            //Para cada item do array, propriedade de objRef, será feita uma interação
            objRef[m[1]][m[2]].forEach((item: any, itemSeq: number) => {
                let tempItem = (<RegExpExecArray>m)[4];
                const reItens = /##(.+)##/gm;
                let mItens;
                while ((mItens = reItens.exec((<RegExpExecArray>m)[4])) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (mItens.index === reItens.lastIndex) {
                        reItens.lastIndex++;
                    }
                    //Se o mItens[0] tiver interrogação, precisa substituir com escape
                    const subRE = new RegExp(mItens[0].replace(/\?/g, '\\?'), 'g');
                    //Se o item entre hashs for a expressão '?seq', substitui pelo número sequencial
                    const vReplace = mItens[1] == '?seq' ? itemSeq + 1 : item[mItens[1]] ? item[mItens[1]] : '';
                    tempItem = tempItem.replace(subRE, vReplace);
                }
                //vai acumulando os itens em uma variável temporária
                tempItens += tempItem;
            });
            htmlFinal = htmlFinal.replace(m[0], tempItens);
        }
    }
    return htmlFinal;
}

/**
 * Clona a {ordemServico}, formata alguns atributos e inclui outros necessários ao template HTML da OS para inclusão no SEI
 *
 * @param ordemServico Ordem de Serviço original
 */
function getOrdemServicoFormatadaToTemplate(ordemServico: OrdemServico, tipoOrdemServico: TipoOrdemServicoContrato) {
    const osFormatada = JSON.parse(JSON.stringify(ordemServico));
    osFormatada.numero = String(ordemServico.numero).padStart(3, '0');
    osFormatada.emergencialSim = ordemServico.emergencial ? 'X' : '';
    osFormatada.emergencialNao = ordemServico.emergencial ? '' : 'X';
    osFormatada.dtEmissao = moment(ordemServico.dtEmissao).format('DD/MM/YYYY');
    osFormatada.dtInicioPlanejada = moment(ordemServico.etapas[0].dtInicioPlanejada).format('DD/MM/YYYY');
    osFormatada.dtFimPlanejada = moment(ordemServico.etapas[ordemServico.etapas.length - 1].dtFimPlanejada).format(
        'DD/MM/YYYY',
    );
    osFormatada.dtFimGarantia = moment(ordemServico.etapas[ordemServico.etapas.length - 1].dtFimPlanejada)
        .add(tipoOrdemServico.tempoGarantia, tipoOrdemServico.unidadeGarantia as DurationInputArg2)
        .format('DD/MM/YYYY');
    osFormatada.nomeFiscalTecnico = ordemServico.nomeFiscalTecnico.toUpperCase();
    osFormatada.nomeRequisitante = ordemServico.nomeRequisitante.toUpperCase();
    let totalQuantidadeEstimada = 0;
    let totalValorEstimado = 0;
    //Formatação dos itens da OS
    osFormatada.itens.forEach((item: any) => {
        item.quantidadeEstimada = parseFloat(item.quantidadeEstimada);
        item.valorEstimado = formataNumeroStringLocal(
            item.quantidadeEstimada * parseFloat(item.valorUnitarioEstimado),
            true,
        );
        totalQuantidadeEstimada += item.quantidadeEstimada;
        totalValorEstimado += item.quantidadeEstimada * parseFloat(item.valorUnitarioEstimado);
        item.quantidadeEstimada = formataNumeroStringLocal(item.quantidadeEstimada, false);
    });
    osFormatada.totalMetrica = osFormatada.itens[0].siglaMetrica; //se tiver mais de uma métrica, isso fica errado
    osFormatada.totalQuantidadeEstimada = formataNumeroStringLocal(totalQuantidadeEstimada, false);
    osFormatada.totalValorEstimado = formataNumeroStringLocal(totalValorEstimado, true);
    //Formatação das etapas da OS
    osFormatada.etapas.forEach((etapa: any) => {
        etapa.dtInicioPlanejada = moment(etapa.dtInicioPlanejada).format('DD/MM/YYYY');
        etapa.dtFimPlanejada = moment(etapa.dtFimPlanejada).format('DD/MM/YYYY');
    });

    return osFormatada;
}
