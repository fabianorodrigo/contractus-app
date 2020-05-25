import {IEtapaOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {getStatusOrdemServico} from '../../interface-models/getStatusOrdemServico';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function editarRealizado(
    c: ConstrutorRetornoPermissoes,
    etapa: IEtapaOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ############### ORDEM DE SERVIÇO JÁ DEVE TER SIDO EMITIDA ######*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) > StatusOrdemServico.RASCUNHO,
        'dtInicioReal',
        `Dados de realização da Etapa só podem ser editados após emissão da Ordem de Serviço`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    /* ############################# TERMO NÃO PODE JÁ TER SIDO EMITIDO #####################################*/
    r = c.construir(
        !tem(etapa.numeroDocumentoTermoAceitacaoSEI) && !tem(etapa.linkTermoAceitacaoSEI),
        '',
        `Termo de Aceitação já foi emitido para esta etapa`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
