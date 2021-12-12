import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import _ from 'lodash';

import { Field } from './types';

export interface InputFieldProps {
    field: Field,
    type?: 'password' | 'input'
}

export const TextField = (props: InputFieldProps) => {
    const { field: { label, name, form: { register, formState: { errors } } }, type } = props;

    const error = _.get(errors, name);

    return (
        <FormControl
          isInvalid={error}
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
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
    );
};