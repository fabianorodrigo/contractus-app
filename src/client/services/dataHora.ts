import moment, {Moment} from 'moment';

export enum LocalFeriado {
    RioDeJaneiro,
    RJ,
    Brasil,
}

/**
 * Retorna o próximo dia útil a partir da {data} informada.
 * Se {data} é um dia útil, retornará o próprio
 * @param data data de referência
 */
export function getProximoDiaUtil(data: Moment, local?: LocalFeriado): Moment {
    const clone = data.clone();
    clone.hour(0);
    clone.minute(0);
    clone.second(0);
    clone.millisecond(0);
    const funcaoLocalDiaUtil =
        local == undefined || local == LocalFeriado.Brasil
            ? eDiaUtilBrasil
            : local == LocalFeriado.RJ
            ? eDiaUtilUFRioDeJaneiro
            : eDiaUtilCidadeRioDeJaneiro;

    while (!funcaoLocalDiaUtil(clone)) {
        clone.add(1, 'd');
    }

    return clone;
}

/**
 * Retorna TRUE se é um dia útil e FALSE se é sábado, domingo ou feriado
 * @param data data analisada
 */
export function eDiaUtilCidadeRioDeJaneiro(data: Moment): boolean {
    if (!eDiaUtilUFRioDeJaneiro(data)) {
        return false;
    }
    return !['2001'].includes(data.format('DDMM'));
}

/**
 * Retorna TRUE se é um dia útil e FALSE se é sábado, domingo ou feriado
 * @param data data analisada
 */
export function eDiaUtilUFRioDeJaneiro(data: Moment): boolean {
    if (!eDiaUtilBrasil(data)) {
        return false;
    }
    return !['2304', '2011'].includes(data.format('DDMM'));
}

/**
 * Retorna TRUE se é um dia útil e FALSE se é sábado, domingo ou feriado
 * @param data data analisada
 */
export function eDiaUtilBrasil(data: Moment): boolean {
    if (data.isoWeekday() >= 6) {
        return false;
    } else if (['0101', '2104', '0105', '0709', '1210', '2810', '0211', '1511', '2512'].includes(data.format('DDMM'))) {
        return false;
    }
    //o domingo de Páscoa pode variar desde 22 de Março até 25 de Abril, o carnaval é 47 dias antes e Corpus Christi 60 dias depois
    //O carnaval pode cair no mínimo no dia 04/02 e o Corpus Christi pode cair no máximo 24/06
    //portanto, só faz sentido calcular os feriados móveis se a data analisada está neste intervalo
    else if (data.isBetween(`${data.year()}-02-04`, `${data.year()}-06-24`)) {
        const feriadosMoveis = [];
        const domingoPascoa = getDomingoPascoa(data.year());
        feriadosMoveis.push(domingoPascoa.format('DDMM'));
        const tercaCarnavall = domingoPascoa.clone().subtract(47, 'd');
        tercaCarnavall.isoWeekday() == 1
            ? tercaCarnavall.add(1, 'd')
            : tercaCarnavall.isoWeekday() == 3
            ? tercaCarnavall.subtract(1, 'd')
            : '';
        feriadosMoveis.push(tercaCarnavall.format('DDMM'));
        const quintaCorpusChristi = domingoPascoa.clone().add(60, 'd');
        feriadosMoveis.push(quintaCorpusChristi.format('DDMM'));
        if (feriadosMoveis.includes(data.format('DDMM'))) {
            return false;
        }
    }
    return true;
}

/**
 * Calcula a data do domingo de Páscoa, que é celebrada no primeiro domingo após a primeira lua cheia que ocorre depois
 * do equinócio da Primavera (no hemisfério norte, outono no hemisfério sul),
 * fonte: https://pt.wikipedia.org/wiki/C%C3%A1lculo_da_P%C3%A1scoa
 *
 * @param ano Ano analisado
 */
function getDomingoPascoa(ano: number): Moment {
    var X = 0;
    var Y = 0;

    if (ano >= 1582 && ano <= 1699) {
        X = 22;
        Y = 2;
    }
    if (ano >= 1700 && ano <= 1799) {
        X = 23;
        Y = 3;
    }
    if (ano >= 1800 && ano <= 1899) {
        X = 23;
        Y = 4;
    }
    if (ano >= 1900 && ano <= 2099) {
        X = 24;
        Y = 5;
    }
    if (ano >= 2100 && ano <= 2199) {
        X = 24;
        Y = 6;
    }
    if (ano >= 2200 && ano <= 2299) {
        X = 25;
        Y = 7;
    }

    var a = ano % 19;
    var b = ano % 4;
    var c = ano % 7;
    var d = (19 * a + X) % 30;
    var e = (2 * b + 4 * c + 6 * d + Y) % 7;

    var day;
    var month;
    if (d + e < 10) {
        day = d + e + 22;
        month = 3;
    } else {
        day = d + e - 9;
        month = 4;
    }
    //26 of april 2076
    if (day == 26 && month == 4) {
        day = 19;
    }

    //25 of april 2049
    if (day == 25 && month == 4 && d == 28 && a > 10) {
        day = 18;
    }

    return moment(new Date(ano, month - 1, day, 0, 0, 0, 0));
}
