import moment from 'moment';

export function validaDataInicioMenorIgualDataFim(dataInicio: string | Date, dataFim: string | Date) {
    const dateInicio: Date = typeof dataInicio == 'string' ? moment(dataInicio).toDate() : dataInicio;
    const dateFim: Date = typeof dataFim == 'string' ? moment(dataFim).toDate() : dataFim;
    return dateInicio.getTime() <= dateFim.getTime();
}
