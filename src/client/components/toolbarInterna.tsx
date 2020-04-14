import {Button, ButtonGroup, Divider, Grid, Radio, Typography} from '@material-ui/core';
import React, {ReactNode} from 'react';
import {TypeOnChangeHTMLInput} from '../models/TypeFunctions';
import useStyles from '../services/styles';

export const ToolbarInterna: React.FC<{
    onChangeVisao: TypeOnChangeHTMLInput;
    visaoSelecionada: 'grid' | 'cards';
    children: ReactNode;
    labelNovo?: string;
}> = ({onChangeVisao, visaoSelecionada, children, labelNovo}) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container spacing={1} justify="space-between">
                <Grid item>
                    {children}
                    <Radio
                        checked={visaoSelecionada === 'grid'}
                        onChange={onChangeVisao}
                        value="grid"
                        name="rb_visao"
                        inputProps={{'aria-label': 'grid'}}
                        key="rbTabelaToolbarInterna"
                    />
                    <Typography color="primary" variant="caption">
                        Tabela
                    </Typography>
                    <Radio
                        checked={visaoSelecionada === 'cards'}
                        onChange={onChangeVisao}
                        value="cards"
                        name="rb_visao"
                        inputProps={{'aria-label': 'cards'}}
                        key="rbCardsToolbarInterna"
                    />
                    <Typography color="primary" variant="caption">
                        Cartões
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup variant="contained" color="primary" key="buttonGroupToolbarInterna">
                        <Button key="btNewToolbarInterna">{labelNovo || 'Novo'} ...</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Divider className={classes.toolbarInterna} />
        </React.Fragment>
    );
};
