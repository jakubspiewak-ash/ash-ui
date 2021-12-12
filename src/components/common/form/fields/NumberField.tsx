import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    NumberInput,
    NumberInputField as ChakraNumberInputField,
} from '@chakra-ui/react';
import _ from 'lodash';

import { Field } from './types';

export interface NumberInputField {
    field: Field,
}

export const NumberField = (props: NumberInputField) => {
    const { field: { name, label, form: { register, formState: { errors } } } } = props;

    const error = _.get(errors, name);

    return (
        <FormControl
          isInvalid={error}
          mb={4}
        >
            <FormLabel>
                <FormErrorIcon
                  color={'red.400'}
                  mr={1}
                />
                {label}
            </FormLabel>
            <InputGroup
              boxShadow={'lg'}
              w={'full'}
            >
                <NumberInput
                  precision={2}
                  width={'full'}
                >
                    <ChakraNumberInputField
                      id={name}
                      {...register(name)}
                    />
                </NumberInput>
            </InputGroup>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
    );
};