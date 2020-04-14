import {Drawer, IconButton, List} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import {TypeBoolean_Void, TypeString_Void} from '../models/TypeFunctions';
import useStyles from '../services/styles';
import {ChevronLeftIcon} from './lib/icons';
import {Menu} from './menu';

interface IReactComponentMenuContainer {
    menuRetratil: boolean;
    menuExpandido: boolean;
    funcaoExpandeMenu: TypeBoolean_Void;
    onClickMenu: TypeString_Void;
}

export const MenuContainer: React.FC<IReactComponentMenuContainer> = ({
    menuRetratil,
    menuExpandido,
    funcaoExpandeMenu,
    onClickMenu,
}) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !menuExpandido && classes.drawerPaperClose),
            }}
            open={menuExpandido}
        >
            <img
                width="100"
                height="54"
                src="img/logo.png"
                style={{
                    position: 'absolute',
                    top: '5px',
                    left: '10px',
                }}
            />
            {menuRetratil && (
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={funcaoExpandeMenu.bind(null, false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
            )}
            <List>
                <Menu onClickMenu={onClickMenu} />
            </List>
        </Drawer>
    );
};
