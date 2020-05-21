import {formataNumeroStringLocal} from '../commonLib/formatacao';
import {
    AreaRequisitante,
    Contrato,
    EtapaOrdemServico,
    Fornecedor,
    OrdemServico,
    TipoOrdemServicoContrato,
} from '../models';

export function getHTMLTermoAceitacaoSEI(
    etapa: EtapaOrdemServico,
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOrdemServico: TipoOrdemServicoContrato,
    fornecedor: Fornecedor,
    areaRequisitante: AreaRequisitante,
) {
    if (!tipoOrdemServico.templateTermoAceitacao)
        throw new Error(`Tipo de Ordem de Serviço não tem Template de Termo de Aceitação definido na base de dados`);
    //como teremos que alterar e incluir alguns valores da OS para passar para o template, clonamos
    const etapaFormatada = getTermoAceitacaoFormatadoToTemplate(etapa);
    etapaFormatada.numeroOS = String(ordemServico.numero).padStart(3, '0');
    areaRequisitante.nomeArea = areaRequisitante.nomeArea.toUpperCase();

    const objRef: {[name: string]: any} = {
        etapa: etapaFormatada,
        os: ordemServico,
        contrato,
        tipoOrdemServico,
        fornecedor,
        areaRequisitante,
        projeto: {nome: ordemServico.idProjeto},
    };

    let htmlFinal = tipoOrdemServico.templateTermoAceitacao;
    const regex = /###([A-z0-9]+)\.([A-z0-9]+)(\.forEach\((.*?)\))?###/gms; //como os trechos que tem forEach podem quebrar linhas, temos que incluir a flag 's' - singleline
    let m: RegExpExecArray | null;

    while ((m = regex.exec(tipoOrdemServico.templateTermoAceitacao)) !== null) {
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
 * Clona a {etapa}, formata alguns atributos e inclui outros necessários ao template HTML do Termo de Aceitação para inclusão no SEI
 *
 * @param etapa Etapa da Ordem de Serviço original
 */
function getTermoAceitacaoFormatadoToTemplate(etapa: EtapaOrdemServico) {
    const etapaFormatada = JSON.parse(JSON.stringify(etapa));
    etapaFormatada.idResultadoEtapa =
        etapa.idResultadoEtapa == 'A'
            ? 'ACEITA'
            : etapa.idResultadoEtapa == 'P'
            ? 'ACEITA PARCIALMENTE'
            : etapa.idResultadoEtapa == 'R'
            ? 'REJEITADA'
            : etapa.idResultadoEtapa;
    etapaFormatada.valorAdiantamentoPlanejado = formataNumeroStringLocal(
        <number>etapa.valorAdiantamentoPlanejado,
        true,
    );
    etapaFormatada.valorAdiantamentoReal = formataNumeroStringLocal(<number>etapa.valorAdiantamentoReal, true);
    return etapaFormatada;
}
