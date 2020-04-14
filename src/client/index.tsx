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
            main: '#195128',
        },
        secondary: {
            main: '#3E67B1',
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
