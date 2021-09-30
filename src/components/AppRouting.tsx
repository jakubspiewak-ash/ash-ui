import {ReactNode} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {useAuthContext} from "./common/AuthContextProvider";
import {UserLoginPage} from "../pages/UserLoginPage";
import {UserRegistrationPage} from "../pages/UserRegistrationPage";
import {Button} from "@chakra-ui/react";

export const AppRouting = () => {
    const {authenticated, logout} = useAuthContext();
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/login"}>
                    {authenticated ? <Redirect to={"/"}/> : <UserLoginPage/>}
                </Route>
                <Route path={"/register"}>
                    <UserRegistrationPage/>
                </Route>
                <SecureRoute path={"/"}>
                    <Button onClick={() => logout()}>
                        Logout
                    </Button>
                </SecureRoute>
            </Switch>
        </BrowserRouter>
    )
}

const SecureRoute = ({children, path}: { children: ReactNode, path: string }) => {
    const {authenticated} = useAuthContext();

    return <Route path={path} render={() => authenticated ?
        children :
        <Redirect to={"/login"}/>}
    />
}