import {Stack} from "@chakra-ui/react";
import {InputForm} from "../common/form/InputForm";
import {FormHeading} from "../common/form/FormHeading";

export const UserConfigurationMailForm = () => {

    return (
        <Stack>
            <FormHeading>Mail</FormHeading>
            <InputForm name={"mail.mailAddress"} label={"Mail address"}/>
            <InputForm name={"mail.password"} type={"password"}  label={"Password"}/>
            <InputForm name={"mail.host"} label={"Host"}/>
            <InputForm name={"mail.port"} label={"Port"}/>
        </Stack>
    )
}

