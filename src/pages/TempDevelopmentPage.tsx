import {Stack} from "@chakra-ui/react";
import {UserRegistrationForm} from "../components/user/UserRegistrationForm";
import {UserConfigurationForm} from "../components/user/UserConfigurationForm";

export const TempDevelopmentPage = () => {
    return (
        <Stack>
            <UserRegistrationForm/>
            <UserConfigurationForm/>
        </Stack>
    )
}