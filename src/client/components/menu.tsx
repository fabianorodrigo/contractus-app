import {Divider} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import {TypeString_Void} from '../models/TypeFunctions';
import {BusinessIcon, GavelIcon, ListAltIcon, RowingIcon} from './icons';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested0: {
        paddingLeft: theme.spacing(3),
    },
    nested1: {
        paddingLeft: theme.spacing(6),
    },
    nested2: {
        paddingLeft: theme.spacing(9),
    },
}));

interface IReactComponentMenu {
    onClickMenu: TypeString_Void;
}

export const Menu: React.FC<IReactComponentMenu> = ({onClickMenu}) => {
    const app = {
        getState: {
            getState: (adminMode: string) => {
                return true;
            },
        },
        appUI: {
            refs: {
                formProcedimento: {
                    abreForm: () => {
                        return;
                    },
                },
            },
        },
    }; //FIXME: Substituir por ContextAPI
    const classes = useStyles();
    return (
        <div>
            <Divider />
            <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
                <ListItem button onClick={onClickMenu.bind(null, 'ordens')}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ordens de Serviço" />
                </ListItem>

                <ListItem button onClick={onClickMenu.bind(null, 'contratos')}>
                    <ListItemIcon>
                        <GavelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contratos" />
                </ListItem>

                <ListItem button onClick={onClickMenu.bind(null, 'fornecedores')}>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fornecedores" />
                </ListItem>
                <ListItem button component="a" href="/explorer">
                    <ListItemIcon>
                        <RowingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Explorer" />
                </ListItem>
            </List>
        </div>
    );
};
