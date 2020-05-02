import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import {HelpOutlineOutlinedIcon} from './icons';
import {Transicao} from './Transicao';

export const DialogConfirmacao: React.FC<{
    mensagem: string;
    detalhesMensagem?: string[];
    funcaoFecharCallback: Function;
}> = (props) => {
    const {mensagem, detalhesMensagem, funcaoFecharCallback} = props;
    const fechar = (sim: boolean) => {
        //setOpen(false);
        funcaoFecharCallback(sim);
    };

    return (
        <Dialog
            open={mensagem != null && mensagem.trim() != ''}
            onClose={fechar.bind(null, false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transicao}
        >
            <DialogTitle id="alert-dialog-title">
                <HelpOutlineOutlinedIcon fontSize="large" style={{float: 'left'}} />
                {mensagem}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {detalhesMensagem?.map((msg, i) => {
                        const msgSplit = msg.split(':');
                        return (
                            <React.Fragment key={`msgDetalhe${i}`}>
                                {msgSplit.length == 2 ? (
                                    <React.Fragment>
                                        <b>{msgSplit[0]}:</b> {msgSplit[1]}
                                    </React.Fragment>
                                ) : (
                                    {msg}
                                )}
                                <br key={`BRmsgDetalhe${i}`} />
                            </React.Fragment>
                        );
                    })}
                </DialogContentText>
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
};
