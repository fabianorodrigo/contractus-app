import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import {AppContextProvider} from './App-Context';
import theme from './theme';

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#2670E8', //'#195128',
        },
        secondary: {
            main: '#9E9D9D', //''#3E67B1',
        },
        success: {
            main: '#168821',
        },
        info: {
            main: '#155BCB',
        },
        warning: {
            main: '#FFCD07',
        },
        error: {
            main: '#E60000',
        },
    },
    overrides: {
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
                <App />
            </ThemeProvider>
        </div>
    </AppContextProvider>,
    document.querySelector('#root'),
);
