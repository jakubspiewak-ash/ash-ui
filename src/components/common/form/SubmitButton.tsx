import React from "react";
import {Button} from "@chakra-ui/react";
import {useFormikContext} from "formik";

export const SubmitButton = () => {
    const {submitForm} = useFormikContext();

    return (
        <Button onClick={submitForm}>
            Submit
        </Button>
    )
}
