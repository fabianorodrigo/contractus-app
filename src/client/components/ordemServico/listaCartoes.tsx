import {Grid} from '@material-ui/core';
import React, {Dispatch, useContext} from 'react';
import {AppContext, AppContextStoreType} from '../../App-Context';
import {OrdensServicoMap} from '../../models/TypeContext';
import useStyles from '../../services/styles';
import {CartaoOrdemServico} from './cartao';

export const ListaCartoesOrdensServico: React.FC<{idContratoSelecionado: number}> = ({idContratoSelecionado}) => {
    //Buscando dados
    const {state}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(AppContext);
    const ordens: OrdensServicoMap = state.ordensServico;
    const ordensContrato = Object.values(ordens).filter(o => o.idContrato == idContratoSelecionado);

    const classes = useStyles();
    const avatarClasses = [classes.blueAvatar, classes.pinkAvatar, classes.greenAvatar];
    let indexAvatarClass = 0;
    return (
        <Grid container className={classes.list}>
            <Grid item>
                <Grid container direction="row" justify="flex-start" spacing={3}>
                    {ordensContrato.map(os => {
                        indexAvatarClass += 1;
                        if (indexAvatarClass >= avatarClasses.length) {
                            indexAvatarClass = 0;
                        }
                        return <CartaoOrdemServico ordemServico={os} />;
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};
