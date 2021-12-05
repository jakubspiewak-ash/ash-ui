import { FormControl, FormErrorIcon, FormLabel, Input } from '@chakra-ui/react';
import _ from 'lodash';

interface FormDateInputProps {
    label: string,
    field: string,
    disabled?: boolean,
}

export const FormDateMonthInput = ({ label, field, disabled }: FormDateInputProps) => {
    return (
        <FormControl mb={4}>
            <FormLabel>
                <FormErrorIcon
                  color={'red.400'}
                  mr={2}
                />
                {label}
            </FormLabel>
            <Input
              disabled={disabled}
              id={field}
              name={field}
              placeholder={label}
              type={'date'}
              // value={_.get(values, field) || ''}
              variant={'filled'}
              // onChange={handleChange}
            />
        </FormControl>
    );
};