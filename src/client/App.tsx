import Container from '@material-ui/core/Container';
import React, {Dispatch, useContext} from 'react';
import {ActionEntity, ActionType, AppContext, AppContextStoreType} from './App-Context';
import {ListaContratos} from './components/contrato/lista';
import {MenuContainer} from './components/menuContainer';
import {NavBar} from './components/navBar';
import {OrdensServico} from './components/ordemServico';
import {getContratos, getFornecedores} from './services/backend';
import useStyles from './services/styles';

export const App: React.FC<{}> = ({}) => {
    const classes = useStyles();
    const [menuAberto, setMenuAberto] = React.useState(true);
    const [menu, setMenu] = React.useState('home');
    function onClickMenu(newMenu: string) {
        setMenu(newMenu);
    }

    //Buscando dados
    const {state, dispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    //Executa uma vez
    React.useEffect(() => {
        getFornecedores().then(fornecedores => {
            fornecedores.forEach(f => {
                dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.FORNECEDOR, dados: f}); //FIXME
            });
        });
        getContratos().then(contratos => {
            contratos.forEach(c => {
                dispatch({tipo: ActionType.INCLUIR, entidade: ActionEntity.CONTRATO, dados: c}); //FIXME
            });
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
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    {menu == 'ordens' && <OrdensServico />}
                    {menu == 'contratos' && <ListaContratos />}
                </Container>
            </main>
        </div>
    );
};
