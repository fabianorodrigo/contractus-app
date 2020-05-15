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

const nomeEntidades: {[nomeClasseModel: string]: string} = {
    Contrato: 'Contrato',
    Fornecedor: 'Fornecedor',
    OrdemServico: 'Ordem de Serviço',
    OrdemServicoFull: 'Ordem de Serviço',
    EntregavelOrdemServico: 'Entregável',
    EntregavelTipoOrdemServico: 'Entregável',
    EtapaOrdemServico: 'Etapa',
    IndicadorNiveisServicoContrato: 'Indicador de Nível de Serviço',
    IndicadorOrdemServico: 'Indicador de Nível de Serviço',
    ItemOrdemServico: 'Item',
    MetricaContrato: 'Métrica do Contrato',
    PapelContrato: 'Papel do Contrato',
    Papel: 'Papel',
    SancaoIndicadorNiveisServicoContrato: 'Sanção de Indicador de Nível de Serviço do Contrato',
    TipoOrdemServicoContrato: 'Tipo de Ordem de Serviço do Contrato',
};
export function formataMensagemErroLoopback(error: any) {
    if (error.code == 'VALIDATION_FAILED') {
        return 'Os dados enviados ao servidor não são válidos: '.concat(
            error.details
                .map((d: {message: string; code: string; path: string}) => {
                    return d.message.replace(/should have required property/g, 'atributo não informado');
                })
                .join(', '),
        );
    } else if (error.code == 'ENTITY_NOT_FOUND') {
        const regex = /Entity not found:(.*) with id (\d+)/gm;
        const partes = regex.exec(error.message);
        console.log(partes);

        if (partes != null && partes?.length > 2) {
            return `O servidor não encontrou  ${
                nomeEntidades[partes[1].trim()] ? nomeEntidades[partes[1].trim()] : partes[1]
            } com o ID ${partes[2]}`;
        }
    }
    return error.message;
}

export function formataMensagemErro(error: Error) {
    if (error.message.toLocaleLowerCase() == 'network error') {
        return 'Falha de comunicação entre a sua estação de trabalho e o servidor. Verifique sua conexão ou entre em contato com a área responsável pelo suporte ao usuário';
    }
    return error.message;
}
