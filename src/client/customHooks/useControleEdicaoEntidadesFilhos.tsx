import React, {useEffect} from 'react';

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
    refInputFoco: React.RefObject<HTMLInputElement>,
    refBotaoFoco: React.RefObject<HTMLInputElement>,
) => {
    const [instancia, setInstancia] = React.useState<any>(null);
    //se estiver editando, essa variável guarda a posição no array
    const [instanciaIndice, setInstanciaIndice] = React.useState<number>(-1);
    const [mostraForm, setMostraForm] = React.useState(false);

    //quando mudar o valor de mostraForm, se for para TRUE, foca no campo de foco
    //passado. Se for FALSE, foca no botão adicionar
    useEffect(() => {
        if (mostraForm && refInputFoco.current != null) {
            refInputFoco.current.focus();
        } else if (!mostraForm && refBotaoFoco.current != null) {
            refBotaoFoco.current.focus();
        }
    }, [mostraForm]);

    /**
     * Abre formulário para iniciar edição de uma nova instância
     *
     * @param instanciaEmBranco Instância com propriedades vazias a ser editada
     */
    const criar = (instanciaAEditar: Partial<T>) => {
        editar(instanciaAEditar, -1);
    };

    /**
     * Abre formulário para iniciar edição de instância existente ou uma nova
     *
     * @param instanciaAEditar Instância a ser editada
     * @param indice Se editando item existente, esta é sua posição no array da
     * respectiva propriedade dentro da entidade principal
     */
    const editar = (instanciaAEditar: Partial<T>, indice: number) => {
        if (instancia != null) {
            fecharForm();
        } else {
            if (indice) setInstanciaIndice(indice);
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
     * @param indice Indice do item no array de subentidades que será removido
     */
    const remover = (indice: number) => {
        //Se estiver rolando uma edição, fecha o form antes de remover
        if (instancia != null) {
            fecharForm();
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
