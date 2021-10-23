import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export interface InputFormProps {
  field: string,
  label: string,
  type?: string,
  disabled?: boolean
}

export const FormInput = ({ field, label, type, disabled }: InputFormProps) => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <FormControl mb={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={field}
        name={field}
        value={_.get(values, field) || ''}
        onChange={handleChange}
        placeholder={label}
        variant='filled'
        type={type}
        disabled={disabled}
      />
    </FormControl>
  );
};
