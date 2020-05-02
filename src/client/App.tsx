import Container from '@material-ui/core/Container';
import {SnackbarProvider} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from './App-Context';
import {ListaContratos} from './components/contrato/lista';
import {MenuContainer} from './components/menuContainer';
import {NavBar} from './components/navBar';
import {OrdensServico} from './components/ordemServico';
import {OrdemServicoContextProvider} from './components/ordemServico/context';
import {getContratos, getFornecedores} from './services/backend';
import {formataMensagemErroLoopback} from './services/formatacao';
import useStyles from './services/styles';

export const App: React.FC<{}> = ({}) => {
    const classes = useStyles();
    const [menuAberto, setMenuAberto] = React.useState(true);
    const [menu, setMenu] = React.useState('ordens');
    function onClickMenu(newMenu: string) {
        setMenu(newMenu);
    }

    //Atualizando dados
    //A component calling useContext will always re-render when the context value changes.
    //If re-rendering the component is expensive, you can optimize it by using memoization.
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    //Executa uma vez
    React.useEffect(() => {
        getFornecedores().then((respostaServicoFornecedores) => {
            if (respostaServicoFornecedores.sucesso) {
                const fornecedores = respostaServicoFornecedores.dados;
                fornecedores.forEach((f) => {
                    dispatch({
                        tipo: ActionType.INCLUIR,
                        entidade: ActionEntity.FORNECEDOR,
                        dados: f,
                    });
                });
            } else {
                alert(formataMensagemErroLoopback((respostaServicoFornecedores.dados as any).error));
                console.error(respostaServicoFornecedores.dados);
            }
        });

        getContratos().then((respostaServicoContratos) => {
            if (respostaServicoContratos.sucesso) {
                const contratos = respostaServicoContratos.dados;
                contratos.forEach((c) => {
                    dispatch({
                        tipo: ActionType.INCLUIR,
                        entidade: ActionEntity.CONTRATO,
                        dados: c,
                    });
                });
            } else {
                alert(formataMensagemErroLoopback((respostaServicoContratos.dados as any).error));
                console.error(respostaServicoContratos.dados);
            }
        });
    }, []);

    return (
        <div className={classes.root}>
            <NavBar menuExpandido={menuAberto} funcaoExpandeMenu={setMenuAberto} />
            <MenuContainer
                menuRetratil={true}
                menuExpandido={menuAberto}
                funcaoExpandeMenu={setMenuAberto}
                onClickMenu={onClickMenu}
            />
            <SnackbarProvider maxSnack={3}>
                <main className={classes.content}>
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
            </SnackbarProvider>
        </div>
    );
};
