import {IEtapaOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';

export function irParaTermoAceitacaoSEI(c: ConstrutorRetornoPermissoes, etapa: IEtapaOrdemServico): RetornoPermisao {
    /* ############################# TERMO TEM QUE JÁ TER SIDO EMITIDO #####################################*/
    let r = c.construir(
        tem(etapa.linkTermoAceitacaoSEI),
        '',
        `Termo de Aceitação ainda não foi emitido para esta etapa no SEI`,
    );
    //Se o uso for HABILITAR_UI, retorna sem acumular mensagens ou qualquer outra validação/processamento
    //if (r.ok == false && c.tipoUso == TipoUsoPermissoes.HABILITAR_UI) return r;

    return r;
}
