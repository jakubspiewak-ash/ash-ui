import {SubmitButton} from "../common/form/SubmitButton";
import {Formik} from "formik";
import {ApiUserCredentials} from "../../services/api.types";
import {FormInput} from "../common/form/FormInput";
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
            <>
                <FormInput name={"login"} label={"Login"}/>
                <FormInput name={"password"} label={"Password"} type={"password"}/>
                <SubmitButton>
                    Sign in
                </SubmitButton>
            </>
        </Formik>
    )
}