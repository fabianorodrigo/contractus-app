/**
 * Substitui as expressões ###obj.propriedade### em {template} pelos valores armazenados em {objRef}
 *
 * @param template Template do documento mesclando expressões entre ### e ### (triplas) e também ## e ## (duplas) com o texto fixo documento
 * @param objRef Objeto que contém os valores a substituírem a expressões no template
 */
export function getHTMLFromTemplate(template: string, objRef: {[name: string]: any}): string {
    let htmlFinal = template;
    const regex = /###([A-z0-9]+)\.([A-z0-9]+)(\.forEach\((.*?)\))?###/gms; //como os trechos que tem forEach podem quebrar linhas, temos que incluir a flag 's' - singleline
    let m: RegExpExecArray | null;

    while ((m = regex.exec(template)) !== null) {
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
            if (objRef[m[1]][m[2]]) {
                objRef[m[1]][m[2]].forEach((item: any, itemSeq: number) => {
                    let tempItem = (<RegExpExecArray>m)[4];
                    const reItens = /##(.*?)##/gm;
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
            }
            htmlFinal = htmlFinal.replace(m[0], tempItens);
        }
    }
    return htmlFinal;
}
