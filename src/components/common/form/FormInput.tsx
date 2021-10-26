import {FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input} from '@chakra-ui/react';
import {useFormikContext} from 'formik';
import _ from 'lodash';

export interface InputFormProps {
    field: string,
    label: string,
    type?: string,
    disabled?: boolean
}

export const FormInput = ({field, label, type, disabled}: InputFormProps) => {
    const {values, handleChange, errors, touched, handleBlur} = useFormikContext<any>();

    return (
        <FormControl
            mb={4}
            isInvalid={!!_.get(errors, field) && !!_.get(touched, field)}
        >
            <FormLabel
                display={"flex"}
                alignItems={"center"}
            >
                <FormErrorIcon
                    mr={2}
                    color={"red.400"}
                />
                {label}
            </FormLabel>
            <Input
                id={field}
                name={field}
                value={_.get(values, field) || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={label}
                variant={'filled'}
                type={type}
                disabled={disabled}
                boxShadow={'lg'}
            />
            <FormErrorMessage>{_.get(errors, field)}</FormErrorMessage>
        </FormControl>
    );
};
