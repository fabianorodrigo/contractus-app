import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function DialogConfirmacao(mensagem: string, funcaoFecharCallback: Function) {
    //const [open, setOpen] = React.useState(true);

    const fechar = (sim: boolean) => {
        //setOpen(false);
        funcaoFecharCallback(sim);
    };

    return (
        <Dialog
            open={true}
            onClose={fechar.bind(null, false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{mensagem}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={fechar.bind(null, false)} color="primary">
                    Não
                </Button>
                <Button onClick={fechar.bind(null, true)} color="primary" autoFocus>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}
