import {UserRegistrationForm} from "../components/user/UserRegistrationForm";
import {Button} from "@chakra-ui/react";
import {FormCard} from "../components/common/form/FormCard";
import {useHistory} from "react-router-dom";
import {FormHeading} from "../components/common/form/FormHeading";

export const UserRegistrationPage = () => {
    const {push} = useHistory();
    return (
        <FormCard bellow={
            <Button width={"full"} mt={4} onClick={() => push("/login")}>
                Log in
            </Button>
        }>
            <FormHeading>Register</FormHeading>
            <UserRegistrationForm/>
        </FormCard>
    )
}