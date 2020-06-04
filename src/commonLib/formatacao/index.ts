/**
 * Formata a string para o formato local do navegador do usuário
 * @param dataStringISO Data no formato ISO
 */
export function formataDataStringLocal(dataStringISO?: string): string {
    return !dataStringISO ? '' : new Date(dataStringISO).toLocaleDateString();
}

export function formataNumeroStringLocal(numero: number | string, financeiro: boolean, casosDecimais: number = 2) {
    let v = numero;
    if (typeof v == 'string') {
        if (v.trim() == '') return v;
        v = parseFloat(v);
    }
    if (v == null) return '';
    if (financeiro) {
        //como o Nodejs não vem por default com todos os locales, formatava errado no server side
        //foi melhor então testar essa função customizada ao invés do toLocaleString (que funciona certinho no front)
        return (
            'R$ ' +
            v
                .toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        );
    } else {
        return v
            .toFixed(casosDecimais)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
    }
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

/**
 * Formata a string completando com zeros à esqueda para ficar com tamanho ao menos igual a 3
 * @param dataStringISO Data no formato ISO
 */
export function formataNumeroTamanho3(valor: string): string {
    return String(valor).padStart(3, '0');
}
