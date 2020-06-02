import {IOrdemServico} from '../../interface-models';
import {ConstrutorRetornoPermissoes} from '../construirRetorno';
import {RetornoPermisao} from '../RetornoPermisao';
import {tem} from '../tem';

export function salvar(c: ConstrutorRetornoPermissoes, ordemServico: IOrdemServico): RetornoPermisao {
    const validacoes = [];
    //contrato
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.idContrato) && ordemServico.idContrato > 0,
            'idContrato',
            'O contrato ao qual a ordem de serviço se refere deve ser informado',
        ),
    );
    //tipo OS
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.idTipoOrdemServicoContrato) && ordemServico.idTipoOrdemServicoContrato > 0,
            'idTipoOrdemServicoContrato',
            'O tipo da Ordem de Serviço deve ser informado',
        ),
    );
    //criticidade
    validacoes.push(
        c.novaValidacao(tem(ordemServico.emergencial), 'emergencial', 'A criticidade dos serviços deve ser informada'),
    );
    //area requisitante
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.idAreaRequisitante) && ordemServico.idAreaRequisitante > 0,
            'idAreaRequisitante',
            'A Área Requisitante do serviço deve ser informada',
        ),
    );
    //nome requisitante
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.nomeRequisitante) && ordemServico.nomeRequisitante.trim() != '',
            'nomeRequisitante',
            'O nome do requisitante do serviço deve ser informado',
        ),
    );
    //nome fiscal técnico
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.nomeFiscalTecnico) && ordemServico.nomeFiscalTecnico.trim() != '',
            'nomeFiscalTecnico',
            'O nome do fiscal técnico do serviço deve ser informado',
        ),
    );
    //itens de serviço
    validacoes.push(
        c.novaValidacao(
            tem(ordemServico.itens) && ordemServico.itens.length > 0,
            'itens',
            'Os itens da ordem de serviço contratados devem ser especificados',
        ),
    );

    return c.construirTudo(validacoes);
}
