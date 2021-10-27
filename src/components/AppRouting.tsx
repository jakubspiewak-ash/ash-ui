import { ReactNode } from 'react';

import { Button } from '@chakra-ui/react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import { ExpensePage } from '../pages/ExpensePage';
import { UserLoginPage } from '../pages/UserLoginPage';
import { UserRegistrationPage } from '../pages/UserRegistrationPage';
import { useAuthContext } from '../providers/common/AuthContextProvider';

const SecureRoute = ({ children, path }: { children: ReactNode, path: string }) => {
  const { authenticated } = useAuthContext();

  return (
    <Route
      path={path}
      render={() => (authenticated
        ? children
        : <Redirect to="/login" />)}
    />
  );
};

export const AppRouting = () => {
  const { authenticated, logout } = useAuthContext();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          {authenticated ? <Redirect to="/" /> : <UserLoginPage />}
        </Route>
        <Route path="/register">
          <UserRegistrationPage />
        </Route>
        <SecureRoute path="/">
          <ExpensePage />
          <Button
            my={4}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </SecureRoute>
      </Switch>
    </BrowserRouter>
  );
};
