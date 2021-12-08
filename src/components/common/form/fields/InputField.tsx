import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { Field } from './types';

export interface InputFieldProps {
    field: Field,
    type?: 'password' | 'input'
}

export const InputField = (props: InputFieldProps) => {
    const { field: { label, name, form: { register } }, type } = props;

    return (
        <FormControl
          boxShadow={'lg'}
          mb={4}
        >
            <FormLabel>
                {label}
            </FormLabel>
            <Input
              id={name}
              placeholder={label}
              type={type}
              variant={'filled'}
              {...register(name)}
            />
        </FormControl>
    );
};