import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import { Field } from './types';

export interface InputFieldProps {
    field: Field,
    type?: 'password' | 'input'
}

export const InputField = (props: InputFieldProps) => {
    const { field: { label, name, form: { formState: { errors }, register } }, type } = props;

    const error: string = errors[name]?.message;

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>
                {label}
            </FormLabel>
            <Input
              id={name}
              type={type}
              {...register(name)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};