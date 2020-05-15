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
    } else if (error.statusCode == 500) {
        return 'Falha no servidor da aplicação. Entre em contato com a área responsável pelo suporte ao usuário';
    }
    return error.message;
}

export function formataMensagemErro(error: Error) {
    if (error.message.toLocaleLowerCase() == 'network error') {
        return 'Falha de comunicação entre a sua estação de trabalho e o servidor. Verifique sua conexão ou entre em contato com a área responsável pelo suporte ao usuário';
    } else if (error.message.toLocaleLowerCase() == 'internal server error') {
        return 'Falha no servidor da aplicação. Entre em contato com a área responsável pelo suporte ao usuário';
    }
    return error.message;
}
