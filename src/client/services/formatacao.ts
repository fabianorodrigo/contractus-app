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
        v = parseFloat(v);
    }
    if (financeiro) {
        return v.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    } else {
        return v.toLocaleString('pt-BR', {
            minimumFractionDigits: casosDecimais,
            maximumFractionDigits: casosDecimais,
        });
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

export function formataMensagemErroLoopback(error: any) {
    if (error.code == 'VALIDATION_FAILED') {
        return 'Os dados enviados ao servidor não são válidos: '.concat(
            error.details
                .map((d: {message: string; code: string; path: string}) => {
                    return d.message.replace(/should have required property/g, 'atributo não informado');
                })
                .join(', '),
        );
    } else {
        return error.message;
    }
}
