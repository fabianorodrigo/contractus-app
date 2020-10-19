import Container from '@material-ui/core/Container';
import React, {Dispatch, useContext} from 'react';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from './App-Context';
import {ListaContratos} from './components/contrato/lista';
import {Progresso} from './components/lib/progresso';
import {FormLogin} from './components/login';
import {MenuContainer} from './components/menuContainer';
import {NavBar} from './components/navBar';
import {OrdensServico} from './components/ordemServico';
import {OrdemServicoContextProvider} from './components/ordemServico/contextOrdemServico';
import {LOCAL_STORAGE_JWT_TOKEN} from './keys';
import {getAreasRequisitantes, getContratos, getFornecedores} from './services/backend';
import {formataMensagemErroLoopback} from './services/formatacaoMensagensErro';
import useStyles from './services/styles';

export const App: React.FC<{}> = ({}) => {
    const classes = useStyles();
    const [menuAberto, setMenuAberto] = React.useState(true);
    const [menu, setMenu] = React.useState('ordens');
    function onClickMenu(newMenu: string) {
        if (newMenu == 'sair') {
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN, '');
            appDispatch({
                tipo: ActionType.LOGOUT,
            });
            window.location.href = '/';
        } else {
            setMenu(newMenu);
        }
    }

    //Atualizando dados
    //A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );
    //Função que para setar o state que coloca o BackDrop na frente da tela com o indicador de progresso ativo
    const emEspera = (emEspera: boolean) => {
        appDispatch({
            tipo: ActionType.EM_ESPERA,
            dados: emEspera,
        });
    };

    //Executa uma vez
    React.useEffect(() => {
        emEspera(true);
        if (state.usuario?.token) {
            //FIXME: Promise.all()
            getFornecedores(state.usuario?.token).then((respostaServicoFornecedores) => {
                if (respostaServicoFornecedores.sucesso) {
                    const fornecedores = respostaServicoFornecedores.dados;
                    fornecedores.forEach((f) => {
                        appDispatch({
                            tipo: ActionType.INCLUIR,
                            entidade: ActionEntity.FORNECEDOR,
                            dados: f,
                        });
                    });
                } else {
                    alert(formataMensagemErroLoopback((respostaServicoFornecedores.dados as any).error));
                    console.error(respostaServicoFornecedores.dados);
                }
                emEspera(false);
            });

            getContratos(state.usuario?.token).then((respostaServicoContratos) => {
                if (respostaServicoContratos.sucesso) {
                    const contratos = respostaServicoContratos.dados;
                    contratos.forEach((c) => {
                        appDispatch({
                            tipo: ActionType.INCLUIR,
                            entidade: ActionEntity.CONTRATO,
                            dados: c,
                        });
                    });
                } else {
                    alert(formataMensagemErroLoopback((respostaServicoContratos.dados as any).error));
                    console.error(respostaServicoContratos.dados);
                }
                emEspera(false);
            });

            getAreasRequisitantes(state.usuario?.token).then((respostaServicoAreas) => {
                if (respostaServicoAreas.sucesso) {
                    const areas = respostaServicoAreas.dados;
                    areas.forEach((a) => {
                        appDispatch({
                            tipo: ActionType.INCLUIR,
                            entidade: ActionEntity.AREA_REQUISIGANTE,
                            dados: a,
                        });
                    });
                } else {
                    alert(formataMensagemErroLoopback((respostaServicoAreas.dados as any).error));
                    console.error(respostaServicoAreas.dados);
                }
                emEspera(false);
            });
        }
    }, [state.usuario?.token]);

    if (state.usuario && state.usuario.token && state.usuario.token != '') {
        return (
            <div className={classes.root}>
                <NavBar menuExpandido={menuAberto} funcaoExpandeMenu={setMenuAberto} />
                <MenuContainer
                    menuRetratil={true}
                    menuExpandido={menuAberto}
                    funcaoExpandeMenu={setMenuAberto}
                    onClickMenu={onClickMenu}
                />
                <main className={classes.content}>
                    <Progresso mostra={state.emEspera} />
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        {menu == 'ordens' && (
                            <OrdemServicoContextProvider>
                                <OrdensServico />
                            </OrdemServicoContextProvider>
                        )}
                        {menu == 'contratos' && <ListaContratos />}
                    </Container>
                </main>
            </div>
        );
    } else {
        return <FormLogin />;
    }
};
