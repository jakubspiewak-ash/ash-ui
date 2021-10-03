import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import {InputFormProps} from "./components.types";

export const FormInput = ({name, label, type}: InputFormProps) => {
    const {values, handleChange} = useFormikContext<any>();

    return (
        <FormControl mb={2}>
            <FormLabel>{label}</FormLabel>
            <Input
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                placeholder={label}
                variant={"filled"}
                type={type}
            />
        </FormControl>
    )
}