import React, {Dispatch, useContext} from 'react';
import {Redirect, Route, RouteProps, useLocation} from 'react-router-dom';
import {AppContext, AppContextStoreType} from './App-Context';

/*export interface ProtectedRouteProps extends RouteProps {
    autenticado: boolean;
    pathAutenticacao: string;
}*/

export interface ProtectedRouteProps extends RouteProps {
    authenticationPath: string;
    redirectPathOnAuthentication: string;
    //setRedirectPathOnAuthentication: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const currentLocation = useLocation();
    const {state, dispatch: appDispatch}: {state: AppContextStoreType; dispatch: Dispatch<any>} = useContext(
        AppContext,
    );

    let isAuthenticated: boolean = false;
    if (state.usuario && state.usuario.token && state.usuario.token != '') isAuthenticated = true;

    let redirectPath = props.redirectPathOnAuthentication;
    if (!isAuthenticated) {
        //props.setRedirectPathOnAuthentication(currentLocation.pathname);
        redirectPath = props.authenticationPath;
    }

    if (redirectPath !== currentLocation.pathname) {
        const renderComponent = () => <Redirect to={{pathname: redirectPath}} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
};
