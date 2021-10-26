import {FormControl, FormErrorIcon, FormLabel, Input} from "@chakra-ui/react";
import _ from "lodash";
import {useFormikContext} from "formik";

interface FormDateInputProps {
    label: string,
    field: string,
    disabled?: boolean,
}

export const FormDateInput = ({label, field, disabled}: FormDateInputProps) => {
    const {values, handleChange} = useFormikContext();

    return (
        <FormControl mb={4}>
            <FormLabel>
                <FormErrorIcon mr={2} color={"red.400"}/>
                {label}
            </FormLabel>
            <Input
                id={field}
                name={field}
                value={_.get(values, field) || ''}
                onChange={handleChange}
                placeholder={label}
                variant={'filled'}
                type={'date'}
                disabled={disabled}
            />
        </FormControl>
    )
}