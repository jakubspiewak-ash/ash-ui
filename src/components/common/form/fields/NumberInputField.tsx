import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    NumberInput,
    NumberInputField as ChakraNumberInputField,
} from '@chakra-ui/react';

import { Field } from './types';

export interface NumberInputField {
    field: Field,
}

export const NumberInputField = (props: NumberInputField) => {
    const { field: { name, label, form: { formState: { errors }, register } } } = props;

    const error: string = errors[name]?.message;

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>
                {label}
            </FormLabel>
            <InputGroup w={'full'}>
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
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};