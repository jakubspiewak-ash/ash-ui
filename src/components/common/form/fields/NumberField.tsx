import {
    FormControl,
    FormErrorIcon,
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

export const NumberField = (props: NumberInputField) => {
    const { field: { name, label, form: { register, formState: { errors } } } } = props;

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
            <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
        </FormControl>
    );
};