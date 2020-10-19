import {Button, Grid, makeStyles} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import React, {Dispatch, useContext} from 'react';
import {IUsuario} from '../../../commonLib';
import {ActionType, AppContext, AppContextStoreType, AppDispatch} from '../../App-Context';
import {useFormHook} from '../../customHooks/useForm';
import {useGetRespostaServico} from '../../customHooks/useGetRespostaServico';
import {autentica} from '../../services/backend';
import useStyles from '../../services/styles';
import {CampoTexto} from '../lib/campoTexto';
import {NavBar} from '../navBar';

const privateUseStyles = makeStyles((theme) => ({
    linkNumeroSEI: {
        marginTop: theme.spacing(3),
    },
}));

export const FormLogin: React.FC<{}> = ({}) => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar(); //hook do notifystack para mostrar mensagens
    const privateClasses = privateUseStyles();
    const {
        state: appState,
        dispatch: appDispatch,
    }: {
        state: AppContextStoreType;
        dispatch: Dispatch<AppDispatch>;
    } = useContext(AppContext);

    const {getRespostaServico: getRespostaPostLogin} = useGetRespostaServico<IUsuario>(autentica);

    let [errosInput, setErrosInput] = React.useState<{[atributo: string]: boolean}>({});
    const {inputs, onInputChange, onSubmit} = useFormHook<{login: string; password: string}>(
        async () => {
            //Habilitação de ações
            const validacao = {ok: true, mensagensAtributo: {}};
            if (inputs.login.trim() == '') {
                validacao.ok = false;
                (validacao.mensagensAtributo as any)['login'] = `Nome do usuário/Login deve ser informado`;
            }
            if (inputs.password.trim() == '') {
                validacao.ok = false;
                (validacao.mensagensAtributo as any)['password'] = `Senha deve ser informada`;
            }

            if (validacao.ok) {
                const respostaServico = await getRespostaPostLogin(inputs);
                if (respostaServico.sucesso) {
                    appDispatch({
                        tipo: ActionType.LOGIN,
                        dados: respostaServico.dados,
                    });
                }
            } else if (validacao.mensagensAtributo) {
                errosInput = {};
                Object.keys(validacao.mensagensAtributo).forEach((atributo: string) => {
                    errosInput[atributo] = true;
                    const msg = (validacao.mensagensAtributo as any)[atributo];
                    enqueueSnackbar(msg, {variant: 'warning'});
                });
                setErrosInput({...errosInput});
            }
        },
        {
            login: '',
            password: '',
        },
    );

    const onSubmitLogin = 5;

    return (
        <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar menuExpandido={false} />
                    <div className={classes.appBarSpacer} />
                    <div className={classes.appBarSpacer} />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <CampoTexto
                        atributo="login"
                        label="Login"
                        objetoValor={inputs}
                        fullWidth={true}
                        obrigatorio={true}
                        onChange={onInputChange}
                        autoFocus={true}
                    />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <CampoTexto
                        atributo="password"
                        label="Senha"
                        objetoValor={inputs}
                        fullWidth={true}
                        obrigatorio={true}
                        onChange={onInputChange}
                        type="password"
                    />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Button type="submit" color="primary">
                        Entrar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
