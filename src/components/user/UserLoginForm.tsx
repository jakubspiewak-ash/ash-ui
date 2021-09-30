import {Stack} from "@chakra-ui/react";
import {SubmitButton} from "../common/form/SubmitButton";
import {Formik} from "formik";
import {ApiUserCredentials} from "../../services/api.types";
import {InputForm} from "../common/form/InputForm";
import {useAuthContext} from "../common/AuthContextProvider";

const emptyForm: ApiUserCredentials = {
    login: "",
    password: ""
}

export const UserLoginForm = () => {
    const {login} = useAuthContext();

    return (
        <Formik<ApiUserCredentials>
            enableReinitialize
            initialValues={emptyForm}
            onSubmit={login}
        >
            <Stack>
                <InputForm name={"login"} label={"Login"}/>
                <InputForm name={"password"} label={"Password"} type={"password"}/>
                <SubmitButton/>
            </Stack>
        </Formik>
    )
}