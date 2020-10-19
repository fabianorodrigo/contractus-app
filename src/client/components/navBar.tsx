import {AppBar, IconButton, InputBase, Toolbar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import {TypeBoolean_Void} from '../models/TypeFunctions';
import useStyles from '../services/styles';
import {MenuIcon, SearchIcon} from './lib/icons';

export const NavBar: React.FC<{
    menuExpandido: boolean;
    funcaoExpandeMenu?: TypeBoolean_Void;
    funcaoProcura?: TypeBoolean_Void;
    textoCampoBusca?: string;
}> = ({menuExpandido, funcaoExpandeMenu, funcaoProcura, textoCampoBusca}) => {
    const classes = useStyles();
    const inputSearchRef = React.useRef(null);
    //texto de busca
    const [textoFiltro, setTextoFiltro] = React.useState('');
    function onChangeTextoFiltro(event: React.ChangeEvent<HTMLInputElement>) {
        setTextoFiltro(event.currentTarget.value);
    }
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, menuExpandido && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                {funcaoExpandeMenu && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Abrir menu"
                        onClick={funcaoExpandeMenu.bind(null, true)}
                        className={clsx(classes.menuButton, menuExpandido && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Gestão de Contratos Administrativos
                </Typography>
                {funcaoProcura && (
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            id="inputSearch"
                            autoFocus
                            placeholder={textoCampoBusca || 'Procurar … '}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{
                                'aria-label': 'Procurar',
                            }}
                            value={textoFiltro}
                            ref={inputSearchRef}
                            onChange={onChangeTextoFiltro}
                        />
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};
