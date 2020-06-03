export function arredonda(numero: number, numeroCasas: 0 | 1 | 2 | 3 = 2): number {
    let valor = numero;
    if (typeof valor == 'string') {
        valor = parseFloat(valor);
    }
    if (valor == null) return NaN;
    if (numeroCasas == 2) {
        return Math.round((valor + Number.EPSILON) * 100) / 100;
    } else if (numeroCasas == 1) {
        return Math.round((valor + Number.EPSILON) * 10) / 10;
    } else if (numeroCasas == 0) {
        return Math.floor(valor);
    } else {
        return Math.round((valor + Number.EPSILON) * 1000) / 1000;
    }
}
