import {Box, Input, Text} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {InputFormProps} from "./components.types";

export const InputForm = ({name, label, type}: InputFormProps) => {
    const {values, handleChange} = useFormikContext<any>();

    return (
        <Box>
            <Text fontSize={"md"}>{label}</Text>
            <Input
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                placeholder={label}
                type={type}
            />
        </Box>
    )
}