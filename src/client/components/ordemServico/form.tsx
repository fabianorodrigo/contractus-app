import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {TransitionProps} from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import {OrdemServico} from '../../../models';
import {TypeOrdemServico_Void} from '../../models/TypeFunctions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FormOrdemServico: React.FC<{ordemServico: OrdemServico; funcaoFecharForm: TypeOrdemServico_Void}> = ({
    ordemServico,
    funcaoFecharForm,
}) => {
    const classes = useStyles();
    const [aberto, setAberto] = React.useState(true);
    const [ordem, setOrdem] = React.useState(ordemServico);

    const onClickClose = () => {
        setAberto(false);
        funcaoFecharForm(ordem);
    };

    return (
        <div>
            <Dialog fullScreen open={aberto} onClose={onClickClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClickClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onClickClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
};
