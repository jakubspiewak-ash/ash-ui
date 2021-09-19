import {Stack} from "@chakra-ui/react";
import {RegistrationForm} from "../components/user/RegistrationForm";
import {UserConfigurationForm} from "../components/user/UserConfigurationForm";

export const TempDevelopmentPage = () => {
    return (
        <Stack>
            <RegistrationForm/>
            <UserConfigurationForm/>
        </Stack>
    )
}