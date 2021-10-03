import {Button} from "@chakra-ui/react";
import {UserLoginForm} from "../components/user/UserLoginForm";
import {useHistory} from "react-router-dom";
import {FormCard} from "../components/common/form/FormCard";
import {FormHeading} from "../components/common/form/FormHeading";

export const UserLoginPage = () => {
    const {push} = useHistory();

    return (
        <FormCard bellow={
            <Button width={"full"} mt={4} onClick={() => push("/register")}>
                Register
            </Button>
        }>
            <FormHeading>
                Login
            </FormHeading>
            <UserLoginForm/>
        </FormCard>
    )
}