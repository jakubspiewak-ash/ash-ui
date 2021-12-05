import { ReactNode } from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ExpensePage } from '../pages/ExpensePage';
import { UserLoginPage } from '../pages/UserLoginPage';
import { UserRegistrationPage } from '../pages/UserRegistrationPage';
import { useAppSelector } from '../redux/hooks';

const SecureRoute = ({ children, path }: { children: ReactNode, path: string }) => {
    const authenticated = useAppSelector((state) => state.auth.authenticated);

    return (
        <Route
          path={path}
          render={() => (authenticated
                ? children
                : <Redirect to="/login"/>)}
        />
    );
};

export const AppRouting = () => {
    const authenticated = useAppSelector((state) => state.auth.authenticated);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    {authenticated ? <Redirect to="/"/> : <UserLoginPage/>}
                </Route>
                <Route path="/register">
                    <UserRegistrationPage/>
                </Route>
                <SecureRoute path="/">
                    <ExpensePage/>
                </SecureRoute>
            </Switch>
        </BrowserRouter>
    );
};
