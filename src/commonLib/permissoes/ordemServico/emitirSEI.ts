import {getStatusOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function emitirSEI(c: ConstrutorRetornoPermissoes, ordemServico: IOrdemServico): RetornoPermisao {
    /* ################## A OS JÁ TEM QUE TER SIDO SALVA NA BASE (TER UM ID) ##############################*/
    let r = c.construir(tem(ordemServico.id), '', `Ordem de Serviço não possui um ID`);
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ############################# OS NÃO PODE JÁ TER SIDO EMITIDA #####################################*/
    r = c.construir(
        !tem(ordemServico.numeroDocumentoOrdemServicoSEI) && !tem(ordemServico.linkOrdemServicoSEI),
        '',
        `Ordem de Serviço já foi emitida. SEI: ${ordemServico.numeroDocumentoOrdemServicoSEI} - ${ordemServico.linkOrdemServicoSEI}`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ORDEM DE SERVIÇO DEVE ESTAR EM RASCUNHO #########################*/
    r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO,
        '',
        `Ordem de Serviço deve estar no modo rascunho para ser emitida no SEI`,
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ORDEM DE SERVIÇO NÁO PODE TER SIDO CANCELADA ##########################*/
    r = c.construir(
        !tem(ordemServico.dtCancelamento),
        '',
        `A Ordem de Serviço consta como cancelada. Não é possível emiti-la no SEI`,
        r,
    );
    return r;
}
