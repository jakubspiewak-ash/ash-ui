import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

import { Field } from './types';

export interface InputFieldProps {
    field: Field,
    type?: 'password' | 'input'
}

export const TextField = (props: InputFieldProps) => {
    const { field: { label, name, form: { register, formState: { errors } } }, type } = props;

    return (
        <FormControl
          isInvalid={errors[name]}
          mb={4}
        >
            <FormLabel>
                {errors[name] && <FormErrorIcon
                  color={'red.400'}
                  mr={1}
                                 />}
                {label}
            </FormLabel>
            <Input
              boxShadow={'lg'}
              id={name}
              placeholder={label}
              type={type}
              variant={'filled'}
              {...register(name)}
            />
            <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
        </FormControl>
    );
};