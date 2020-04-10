/**
 * Formata a string para o formato local do navegador do usuário
 * @param dataStringISO Data no formato ISO
 */
export function formataDataStringLocal(dataStringISO: string): string {
    return new Date(dataStringISO).toLocaleDateString();
}
/**
 * Recebe um nome e retorna apenas o primeiro e o último
 * @param nome Nome a se encurtar
 */
export function encurtaNome(nome: string): string {
    const nomes = nome.replace(/  /g, ' ').split(' ');
    if (nomes.length < 3) return nome;
    return nomes[0].concat(' ', nomes[nomes.length - 1]);
}
