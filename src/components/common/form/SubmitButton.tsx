import React, {useState} from "react";
import {Button, Spinner} from "@chakra-ui/react";
import {useFormikContext} from "formik";

export const SubmitButton = ({children}: { children?: string }) => {
    const {submitForm} = useFormikContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async () => {
        setIsLoading(true);
        submitForm()
            .then(() => setIsLoading(false))
    }

    return (
        <Button variant={"outline"} width={"full"} mt={4} onClick={handleSubmitForm}>
            {isLoading ? <Spinner/> : (children || "Submit")}
        </Button>
    )
}
