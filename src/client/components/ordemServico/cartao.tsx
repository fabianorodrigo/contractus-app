import {Button, Grid, Paper, Typography} from '@material-ui/core';
import React from 'react';
import {encurtaNome} from '../../../commonLib/formatacao';
import {OrdemServico} from '../../../models';
import useStyles from '../../services/styles';
import {BuildIcon, ImportantDevicesIcon, SearchIcon} from '../lib/icons';

const icones = [null, <SearchIcon />, <ImportantDevicesIcon />, <BuildIcon />];

export const CartaoOrdemServico: React.FC<{
    ordemServico: OrdemServico;
}> = ({ordemServico}) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Paper className={classes.listItem}>
                <Grid container spacing={1} direction="column">
                    <Grid item>
                        <Typography color="primary" variant="h6">
                            {String(ordemServico.numero).padStart(3, '0')} - {ordemServico.idProduto}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            Requisitante:
                            {' '.concat(encurtaNome(ordemServico.nomeRequisitante))}
                        </Typography>
                        <Typography variant="body2">
                            Fiscal Técnico:
                            {' '.concat(encurtaNome(ordemServico.nomeFiscalTecnico))}
                        </Typography>
                        <Typography variant="body2" style={{cursor: 'pointer'}}>
                            Ver Detalhes
                        </Typography>
                    </Grid>
                    <Grid item direction="row">
                        {icones[ordemServico.idTipoOrdemServicoContrato]}
                        <Button color="primary">Ver</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
