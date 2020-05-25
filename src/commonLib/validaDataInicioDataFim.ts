import moment from 'moment';

export function validaDataInicioMenorIgualDataFim(dataInicio: string | Date, dataFim: string | Date) {
    const dateInicio: Date = typeof dataInicio == 'string' ? moment(dataInicio).toDate() : dataInicio;
    const dateFim: Date = typeof dataFim == 'string' ? moment(dataFim).toDate() : dataFim;
    //as duas datas tem que ser válidas para conseguir fazer a comparação
    if (dateInicio && dateFim) {
        return dateInicio.getTime() <= dateFim.getTime();
    }
}
