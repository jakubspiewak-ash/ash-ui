import {
    FormControl,
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
    const { field: { name, label, form: { register } } } = props;

    return (
        <FormControl
          boxShadow={'lg'}
          mb={4}
        >
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
        </FormControl>
    );
};