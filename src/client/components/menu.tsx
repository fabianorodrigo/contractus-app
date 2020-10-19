import {Divider} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import {TypeString_Void} from '../models/TypeFunctions';
import {BusinessIcon, GavelIcon, ListAltIcon, MeetingRoomIcon, PeopleAltIcon, RowingIcon} from './lib/icons';

const useStyles = makeStyles((theme) => ({
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
        <div key="divMenu">
            <Divider key="dividerMenu" />
            <List key="menuList" component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
                <ListItem key="menuListItemOSs" button onClick={onClickMenu.bind(null, 'ordens')}>
                    <ListItemIcon key="menuListIconOSs">
                        <ListAltIcon key="menuListIconOSs" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextOSs" primary="Ordens de Serviço" />
                </ListItem>

                <ListItem key="menuListItemContratos" button onClick={onClickMenu.bind(null, 'contratos')}>
                    <ListItemIcon key="menuListIconContratos">
                        <GavelIcon key="menuListIconContratos" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextContratos" primary="Contratos" />
                </ListItem>

                <ListItem
                    key="menuListAreasRequisitantes"
                    button
                    onClick={onClickMenu.bind(null, 'areasRequisitantes')}
                >
                    <ListItemIcon key="menuListIconAreasRequisitantes">
                        <PeopleAltIcon key="menuListIconAreasRequisitantes" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextAreasRequisitantes" primary="Áreas Requisitantes" />
                </ListItem>

                <ListItem key="menuListItemFornecedores" button onClick={onClickMenu.bind(null, 'fornecedores')}>
                    <ListItemIcon key="menuListIconFornecedores">
                        <BusinessIcon key="menuListIconFornecedores" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextFornecedores" primary="Fornecedores" />
                </ListItem>
                <ListItem key="menuListItemExplorer" button component="a" href="/explorer">
                    <ListItemIcon key="menuListIconExplorer">
                        <RowingIcon key="menuIconExplorer" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextExplorer" primary="Explorer" />
                </ListItem>
                <ListItem key="menuListItemSair" button onClick={onClickMenu.bind(null, 'sair')}>
                    <ListItemIcon key="menuListIconSair">
                        <MeetingRoomIcon key="menuIconSair" />
                    </ListItemIcon>
                    <ListItemText key="menuListTextSair" primary="Sair" />
                </ListItem>
            </List>
        </div>
    );
};
