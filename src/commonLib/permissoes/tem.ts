/**
 * Retorna TRUE se o {alvo} é diferente de NULL e também de UNDEFINED
 * @param alvo variável a ser avaliada
 */
export function tem(alvo: any) {
    return alvo != null && alvo != undefined;
}
