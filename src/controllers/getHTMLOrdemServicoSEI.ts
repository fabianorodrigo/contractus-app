import {Contrato, OrdemServico, TipoOrdemServicoContrato} from '../models';

export function getHTMLOrdemServicoSEI(
    ordemServico: OrdemServico,
    contrato: Contrato,
    tipoOS: TipoOrdemServicoContrato,
) {
    if (!tipoOS.templateOrdemServico)
        throw new Error(`Tipo de Ordem de Serviço não tem Template definido na base de dados`);

    const objRef: {[name: string]: any} = {
        os: ordemServico,
        contrato: contrato,
        tipoOrdemServico: tipoOS,
    };

    let htmlFinal = tipoOS.templateOrdemServico;
    const regex = /###([A-z0-9]+)\.([A-z0-9]+)(###|(\.forEach\()?(.*)?\)?###)/gms;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(tipoOS.templateOrdemServico)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        //o elemento 0 tem de ### a ###
        //o elemento 1 tem o nome da entidade
        //o elemento 2 tem o nome da propriedade
        if (m[4] == undefined && m[5] == undefined) {
            const subRE = new RegExp(m[0], 'g');
            if (objRef[m[1]]) {
                htmlFinal = htmlFinal.replace(subRE, objRef[m[1]][m[2]]);
            }
        } else {
            //elemento 5 tem o conteúdo entre os parênterese do .forEach
            objRef[m[1]][m[2]].forEach((item: any, itemSeq: number) => {
                const reItens = /##(.)+##/gms;
                let mItens;
                while ((mItens = reItens.exec((<RegExpExecArray>m)[5])) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (mItens.index === reItens.lastIndex) {
                        reItens.lastIndex++;
                    }
                    const subRE = new RegExp(mItens[0], 'g');
                    //Se o item entre hashs for a expressão '?seq', substitui pelo número sequencial
                    const vReplace = item[mItens[1]] == '?seq' ? itemSeq : item[mItens[1]];
                    htmlFinal = htmlFinal.replace(subRE, item[mItens[1]]);
                }
            });
        }
    }
    return htmlFinal;
}
