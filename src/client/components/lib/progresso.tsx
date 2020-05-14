import {Backdrop} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

export const Progresso: React.FC<{mostra: boolean}> = ({mostra}) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={mostra}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
