import {getStatusOrdemServico, IEtapaOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function remover(
    c: ConstrutorRetornoPermissoes,
    etapa: IEtapaOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ############################# TERMO NÃO PODE JÁ TER SIDO EMITIDO #####################################*/
    let r = c.construir(
        etapa.numeroDocumentoTermoAceitacaoSEI == null && etapa.linkTermoAceitacaoSEI == null,
        '',
        `Termo de Aceitação já foi emitido para esta etapa. SEI: ${etapa.numeroDocumentoTermoAceitacaoSEI} - ${etapa.linkTermoAceitacaoSEI}`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* #################### ORDEM DE SERVIÇO DEVE ESTAR EM RASCUNHO OU A ETAPA É UMA ETAPA NÃO PREVISTA NO PLANEJAMENTO #########################*/
    r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO ||
            (etapa.dtInicioPlanejada == null && etapa.dtFimPlanejada == null),
        '',
        `A Ordem de Serviço já foi emitida e esta era uma etapa prevista no planejamento`,
        r,
    );
    return r;
}
