import {IEtapaOrdemServico, IOrdemServico, StatusOrdemServico} from '../../interface-models';
import {getStatusOrdemServico} from '../../interface-models/getStatusOrdemServico';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';
import {TipoUsoPermissoes} from '../TipoUsoPermissoes';

export function editarDescricao(
    c: ConstrutorRetornoPermissoes,
    etapa: IEtapaOrdemServico,
    ordemServico: IOrdemServico,
): RetornoPermisao {
    /* ############### OU A ORDEM DE SERVIÇO AINDA ESTÁ EM RASCUNHO OU É UMA ETAPA NÃO PREVISTA NA EMISSÃO DA OS ######*/
    let r = c.construir(
        getStatusOrdemServico(ordemServico) == StatusOrdemServico.RASCUNHO ||
            (!tem(etapa.dtInicioPlanejada) && !tem(etapa.dtFimPlanejada)),
        'descricao',
        `Descrição da Etapa não pode ser modificada após emissão da Ordem de Serviço`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
