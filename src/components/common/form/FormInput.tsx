import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputFormProps {
    label: string,
    type?: string,
    disabled?: boolean,
    registration: UseFormRegisterReturn,
    error?: string,
}

export const FormInput = (props: InputFormProps) => {
    const { label, type, registration, error } = props;
    return (
        <FormControl
          isInvalid={!!error}
          mb={4}
        >
            <FormLabel
              alignItems={'center'}
              display={'flex'}
            >
                <FormErrorIcon
                  color={'red.400'}
                  mr={2}
                />
                {label}
            </FormLabel>
            <Input
              boxShadow={'lg'}
              id={registration.name}
              placeholder={label}
              type={type}
              variant={'filled'}
              {...registration}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
