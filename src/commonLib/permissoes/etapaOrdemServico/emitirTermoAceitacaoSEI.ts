import {
    getStatusOrdemServico,
    IEtapaOrdemServico,
    IOrdemServico,
    ITipoOrdemServicoContrato,
    StatusOrdemServico,
} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function emitirTermoAceitacaoSEI(
    c: ConstrutorRetornoPermissoes,
    etapa: IEtapaOrdemServico,
    ordemServico: IOrdemServico,
    tipoOrdemServico: ITipoOrdemServicoContrato,
): RetornoPermisao {
    /* ################## A ETAPA JÁ TEM QUE TER SIDO SALVA NA BASE (TER UM ID) ##############################*/
    let r = c.construir(tem(etapa.id), '', `Etapa não possui um ID`);
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ################## O TIPO DA OS DEVE PREVER TERMOS DE ACEITAÇÃO POR ETAPA ##############################*/
    r = c.construir(
        tipoOrdemServico.termoAceitacaoEmitidoPorEtapa,
        '',
        `O Tipo da Ordem de Serviço não está configurado para emissão de termos de aceitação por etapa`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ############################# TERMO NÃO PODE JÁ TER SIDO EMITIDO #####################################*/
    r = c.construir(
        !tem(etapa.numeroDocumentoTermoAceitacaoSEI) && !tem(etapa.linkTermoAceitacaoSEI),
        '',
        `Termo de Aceitação já foi emitido para esta etapa. SEI: ${etapa.numeroDocumentoTermoAceitacaoSEI} - ${etapa.linkTermoAceitacaoSEI}`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ORDEM DE SERVIÇO NÃO PODE ESTAR EM RASCUNHO #########################*/
    r = c.construir(
        getStatusOrdemServico(ordemServico) > StatusOrdemServico.RASCUNHO,
        '',
        `Termo de Aceitação não pode ser emitido para uma Ordem de Serviço em rascunho`,
        r,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ETAPA NÁO PODE TER SIDO CANCELADA ##########################*/
    r = c.construir(
        !tem(etapa.dtCancelamento),
        '',
        `A Etapa consta como cancelada. Não é possível emitir Termo de Aceitação`,
        r,
    );
    return r;
}
