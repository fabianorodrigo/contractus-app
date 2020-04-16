import {IconButton, makeStyles, Typography} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import {TypeOnClickIconButton} from '../../models/TypeFunctions';
import useStyles from '../../services/styles';
import {CloseIcon} from './icons';

const privateUseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export const TituloDialog: React.FC<{
    titulo: string;
    funcaoFechar: TypeOnClickIconButton;
}> = ({titulo, funcaoFechar}) => {
    const classes = useStyles();
    const privateClasses = privateUseStyles();

    return (
        <MuiDialogTitle disableTypography className={privateClasses.root}>
            <Typography variant="h6">{titulo}</Typography>
            {funcaoFechar ? (
                <IconButton
                    href="#"
                    aria-label="Fechar"
                    className={privateClasses.closeButton}
                    onClick={funcaoFechar.bind(null)}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};
