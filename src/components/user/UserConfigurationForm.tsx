import {Heading, Stack} from "@chakra-ui/react";
import {UserConfigurationMailForm} from "./UserConfigurationMailForm";
import {SubmitButton} from "../common/form/SubmitButton";
import {Formik} from "formik";
import {ApiUserConfiguration} from "../../services/api.types";
import {useEffect, useState} from "react";
import {fetchUserConfiguration, saveUserConfiguration} from "../../services/user.service";

const emptyForm: ApiUserConfiguration = {
    mail: {
        address: undefined,
        password: undefined,
        host: undefined,
        port: undefined,
    }
}

export const UserConfigurationForm = () => {
    const [formValue, setFormValue] = useState(emptyForm);

    const fetchConfiguration = () => {
        fetchUserConfiguration().then(v => v && setFormValue(v))
    }

    const saveConfiguration = (configuration: ApiUserConfiguration) => {
        saveUserConfiguration(configuration).then(fetchUserConfiguration)
    }

    useEffect(() => {
        fetchConfiguration()
    }, [])

    return (
        <Stack>
            <Heading>Configuration</Heading>
            <Formik<ApiUserConfiguration>
                enableReinitialize
                initialValues={formValue}
                onSubmit={values => saveConfiguration(values)}
            >
                <>
                    <UserConfigurationMailForm/>
                    <SubmitButton/>
                </>
            </Formik>
        </Stack>
    )
}