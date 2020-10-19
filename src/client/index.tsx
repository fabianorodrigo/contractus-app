import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {SnackbarProvider} from 'notistack';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import {AppContextProvider} from './App-Context';
import theme from './theme';

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#1351B4', //'#195128', //-color-primary-05 em dsgov.estaleiro.gov.br
        },
        secondary: {
            main: '#9E9D9D', //''#3E67B1', //-color-secondary-05 em dsgov.estaleiro.gov.br
        },
        success: {
            main: '#168821', //cor de aviso SUCCESS no dsvgov
        },
        info: {
            main: '#155BCB', //cor de aviso INFO no dsgov
        },
        warning: {
            main: '#FFCD07', //cor de aviso WARN no dsgov
        },
        error: {
            main: '#E60000', //cor de aviso DANGER no dsgov
        },
    },
    overrides: {
        MuiContainer: {
            root: {
                marginLeft: 0,
            },
        },
        MuiOutlinedInput: {
            input: {
                padding: theme.spacing(1),
            },
        },
        MuiFormLabel: {
            root: {
                paddingLeft: theme.spacing(1),
            },
        },
        MuiFormControl: {
            root: {
                paddingTop: theme.spacing(0),
                paddingLeft: theme.spacing(1),
                marginTop: theme.spacing(0),
                whiteSpace: 'nowrap',
            },
        },
        MuiTableCell: {
            head: {
                backgroundColor: '#EDEDED', //-color-secondary-04 em dsgov.estaleiro.gov.br
            },
            footer: {
                backgroundColor: '#EDEDED', //-color-secondary-03 em dsgov.estaleiro.gov.br
            },
            sizeSmall: {
                paddingLeft: theme.spacing(1),
                paddingRight: theme.spacing(1),
            },
        },
        MuiDialogTitle: {
            root: {
                backgroundColor: '#DBE8FB', //-color-primary-01 em dsgov.estaleiro.gov.br
                padding: `8px 16px`,
            },
        },
    },
});

ReactDOM.render(
    <AppContextProvider>
        <div className="App">
            <ThemeProvider theme={appTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </div>
    </AppContextProvider>,
    document.querySelector('#root'),
);
