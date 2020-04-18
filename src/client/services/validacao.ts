export function validaAtributoObrigatorio(objeto: {[atributo: string]: any}, atributo: string): boolean {
    return objeto[atributo] != null && (typeof objeto[atributo] != 'string' || objeto[atributo].trim() != '');
}
