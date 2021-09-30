import {UserRegistrationForm} from "../components/user/UserRegistrationForm";
import {Center, Heading, Stack} from "@chakra-ui/react";

export const UserRegistrationPage = () => {
    return (
        <Center>
            <Stack>
                <Heading>Register</Heading>
                <UserRegistrationForm/>
            </Stack>
        </Center>
    )
}