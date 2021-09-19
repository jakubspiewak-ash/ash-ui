import {Formik} from "formik";
import {InputForm} from "../common/form/InputForm";
import {Heading} from "@chakra-ui/react";
import {ApiUserCredentials} from "../../services/api.types";
import {SubmitButton} from "../common/form/SubmitButton";
import {useEffect, useState} from "react";
import {fetchUser, saveUser} from "../../services/user.service";

const initialFormValue: ApiUserCredentials = {
    login: undefined,
    password: undefined
}

export const RegistrationForm = () => {
    const [formValue, setFormValue] = useState(initialFormValue);

    const fetchAndSetUser = () => {
        fetchUser().then(users => users && users[0]).then(r => r && setFormValue(r))
    }

    useEffect(() => {
        fetchAndSetUser();
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues={formValue}
            onSubmit={value => {
                console.log(value)
                saveUser(value as ApiUserCredentials).then(() => fetchAndSetUser())
            }}
        >
            <>
                <Heading>User</Heading>
                <InputForm name={"login"} label={"Login"}/>
                <InputForm name={"password"} label={"Password"} type={"password"}/>
                <SubmitButton/>
            </>
        </Formik>
    )
}