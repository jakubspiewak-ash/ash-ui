import {Formik} from "formik";
import {InputForm} from "../common/form/InputForm";
import {ApiUserCredentials} from "../../services/api.types";
import {SubmitButton} from "../common/form/SubmitButton";
import {saveUser} from "../../services/user.service";
import {useHistory} from "react-router-dom";

const initialFormValue: ApiUserCredentials = {
    login: undefined,
    password: undefined
}

export const UserRegistrationForm = () => {
    const {push} = useHistory();
    const onSubmit = (user: ApiUserCredentials) => saveUser(user).then(() => push("/login"));

    return (
        <Formik
            enableReinitialize
            initialValues={initialFormValue}
            onSubmit={onSubmit}
        >
            <>
                <InputForm name={"login"} label={"Login"}/>
                <InputForm name={"password"} label={"Password"} type={"password"}/>
                <SubmitButton/>
            </>
        </Formik>
    )
}