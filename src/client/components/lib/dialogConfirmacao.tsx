import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import ReactDOM from 'react-dom';
import useStyles from '../../services/styles';
import {HelpOutlineOutlinedIcon} from './icons';
import {Transicao} from './Transicao';

export function MostrarDialog(mensagem: string, detalhesMensagem?: string[]) {
    const wrapper = document.body.appendChild(document.createElement('div'));

    const promise = new Promise((resolve) => {
        try {
            ReactDOM.render(
                <DialogConfirmacao
                    mensagem={detalhesMensagem ? mensagem : 'Confirmação'}
                    detalhesMensagem={detalhesMensagem ? detalhesMensagem : [mensagem]}
                    funcaoFecharCallback={(sim: boolean) => {
                        resolve(sim);
                    }}
                />,
                wrapper,
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    });

    function dispose() {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(wrapper);
            setTimeout(() => {
                if (document.body.contains(wrapper)) {
                    document.body.removeChild(wrapper);
                }
            });
        }, 200);
    }

    return promise.then(
        (result) => {
            dispose();
            return result;
        },
        (result) => {
            dispose();
            return Promise.reject(result);
        },
    );
}

export const DialogConfirmacao: React.FC<{
    mensagem: string;
    detalhesMensagem?: string[];
    funcaoFecharCallback: Function;
}> = (props) => {
    const classes = useStyles();
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
            <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
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
                                    <span>{msg}</span>
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
