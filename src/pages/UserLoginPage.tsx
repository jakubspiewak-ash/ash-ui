import {Button, Center, Heading, Stack} from "@chakra-ui/react";
import {UserLoginForm} from "../components/user/UserLoginForm";
import {useHistory} from "react-router-dom";

export const UserLoginPage = () => {
    const {push} = useHistory();

    return (
        <Center>
            <Stack>
                <Heading>Login</Heading>
                <UserLoginForm/>
                <Button onClick={() => push("/register")}>
                    Register
                </Button>
            </Stack>
        </Center>
    )
}