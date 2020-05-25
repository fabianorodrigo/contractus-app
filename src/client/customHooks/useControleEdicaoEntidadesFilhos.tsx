import React, {useEffect} from 'react';
import {MostrarDialog} from '../components/lib/dialogConfirmacao';

/**
 * Custom hook para controle da edição de entidades filhos de uma entidade principal.
 * Por exemplo, itens, etapas e entregáveis de uma Ordem de Serviço
 *
 * @param funcaoAdicionarCallback Função que efetivamente realiza a inclusão
 * do item no array dentro da entidade principal
 * @param funcaoAtualizarCallback Função que efetivamente realiza a atualização
 * do item no array dentro da entidade principal
 * @param funcaoRemoverCallback Função que efetivamente realiza a remoção
 * do item no array dentro da entidade principal
 * @param refInputFoco Campo que receberá o foco após a chamada de "editar"
 * @param refBotaoFoco Botão que receberá o foco após concluir a edição
 */
export const useControleEdicaoEntidadesFilhos = <T extends {}>(
    funcaoAdicionarCallback: (instancia: T) => void,
    funcaoAtualizarCallback: (instancia: T, indice: number) => void,
    funcaoRemoverCallback: (indice: number) => void,
    refBotaoFoco: React.RefObject<HTMLInputElement>,
) => {
    const [instancia, setInstancia] = React.useState<any>(null);
    //se estiver editando, essa variável guarda a posição no array
    const [instanciaIndice, setInstanciaIndice] = React.useState<number>(-1);
    const [mostraForm, setMostraForm] = React.useState(false);

    //quando mudar o valor de mostraForm, se for para TRUE, foca no campo de foco
    //passado. Se for FALSE, foca no botão adicionar
    useEffect(() => {
        //console.log('foco', mostraForm, refInputFoco, refInputFoco.current, refBotaoFoco.current);
        if (!mostraForm && refBotaoFoco.current != null) {
            refBotaoFoco.current.focus();
        }
    }, [mostraForm]);

    /**
     * Abre formulário para iniciar edição de uma nova instância
     *
     * @param instanciaEmBranco Instância com propriedades vazias a ser editada
     * @param funcaoInstanciaEmEdicaoMudou Função que verifica se há algum item em edição e se ele sofreu alterações pelo usuário
     */
    const criar = (instanciaEmBranco: Partial<T>, funcaoInstanciaEmEdicaoMudou: () => boolean) => {
        editar(instanciaEmBranco, funcaoInstanciaEmEdicaoMudou, -1);
    };

    /**
     * Abre formulário para iniciar edição de instância existente ou uma nova
     *
     * @param instanciaAEditar Instância a ser editada
     * @param funcaoInstanciaEmEdicaoMudou Função que verifica se há algum item em edição e se ele sofreu alterações pelo usuário
     * @param indice Se editando item existente, esta é sua posição no array da
     * respectiva propriedade dentro da entidade principal
     */
    const editar = async (
        instanciaAEditar: Partial<T>,
        funcaoInstanciaEmEdicaoMudou: () => boolean,
        indice: number,
    ) => {
        if (
            instancia == null ||
            !funcaoInstanciaEmEdicaoMudou() ||
            (await MostrarDialog('Deseja descartar as alterações já realizadas?'))
        ) {
            //fecharForm();
            if (indice != undefined) setInstanciaIndice(indice);
            setInstancia(instanciaAEditar);
            setMostraForm(true);
        }
    };

    /**
     * Abre formulário para iniciar edição de instância existente ou uma nova
     *
     * @param instancia Instância a ser editada
     * @param indice Se editando item existente, esta é sua posição no array da
     * respectiva propriedade dentro da entidade principal
     */
    const confirmar = (instancia: T) => {
        if (instanciaIndice > -1) {
            funcaoAtualizarCallback(instancia, instanciaIndice);
        } else {
            funcaoAdicionarCallback(instancia);
        }
        fecharForm();
    };

    /**
     * Fecha o formulário de edição
     */
    const fecharForm = () => {
        setInstanciaIndice(-1);
        setInstancia(null);
        setMostraForm(false);
    };
    /**
     * Faz o controle necessário para permitir a remoção de um item no array de subentidades e,
     * atendendo aos requisitos, chama a {funcaoRemoverCallback}
     *
     * @param funcaoInstanciaEmEdicaoMudou Função que verifica se há algum item em edição e se ele sofreu alterações pelo usuário
     * @param indice Indice do item no array de subentidades que será removido
     */
    const remover = async (funcaoInstanciaEmEdicaoMudou: () => boolean, indice: number) => {
        if (instancia != null) {
            if (
                !funcaoInstanciaEmEdicaoMudou() ||
                (await MostrarDialog('Deseja descartar as alterações já realizadas?'))
            ) {
                fecharForm();
            }
        } else {
            funcaoRemoverCallback(indice);
        }
    };

    return {
        criar,
        editar,
        confirmar,
        fecharForm,
        remover,
        instancia,
        mostraForm,
    };
};
