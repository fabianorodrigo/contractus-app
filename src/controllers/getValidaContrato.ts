import {ContratoRepository} from '../repositories';

/**
 * Busca o Contrato com o {id} solicitado e
 * executa validações dos dados contidos na {os} de acordo com o propósito.
 *
 * @param id Identificador da Ordem de serviço a ser validada (PK)
 * @param proposito Pra qual fim a ordem de serviço está sendo buscada. Com base nesta
 * informação que as validações serão executadas
 */
export async function getValidaContrato(contratoRepository: ContratoRepository, id: number) {
    //busca o contrato com todas as suas relações necessárias
    const include = [{relation: 'tiposOrdemServico'}];

    const contrato = await contratoRepository.findById(id, {
        include,
    });
    if (!contrato.tiposOrdemServico || contrato.tiposOrdemServico.length == 0) {
        throw new Error(
            `O Contrato ${contrato.numeroContrato}/${contrato.anoContrato} não possui a definição dos seus Tipos de Ordens de Serviço`,
        );
    }
    return contrato;
}
