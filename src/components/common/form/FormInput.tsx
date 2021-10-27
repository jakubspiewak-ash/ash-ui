import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export interface InputFormProps {
    field: string,
    label: string,
    type?: string,
    disabled?: boolean
}

export const FormInput = ({ field, label, type, disabled }: InputFormProps) => {
    const { values, handleChange, errors, touched, handleBlur } = useFormikContext<any>();

    return (
        <FormControl
          isInvalid={!!_.get(errors, field) && !!_.get(touched, field)}
          mb={4}
        >
            <FormLabel
              alignItems={"center"}
              display={"flex"}
            >
                <FormErrorIcon
                  color={"red.400"}
                  mr={2}
                />
                {label}
            </FormLabel>
            <Input
              boxShadow={'lg'}
              disabled={disabled}
              id={field}
              name={field}
              placeholder={label}
              type={type}
              value={_.get(values, field) || ''}
              variant={'filled'}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage>{_.get(errors, field)}</FormErrorMessage>
        </FormControl>);

};
