import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { Field } from './types';

export interface InputFieldProps {
    field: Field,
    type?: 'password' | 'input'
}

export const TextField = (props: InputFieldProps) => {
    const { field: { label, name, form: { register } }, type } = props;

    return (
        <FormControl
          mb={4}
        >
            <FormLabel>
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
        </FormControl>
    );
};