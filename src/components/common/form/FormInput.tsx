import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export interface InputFormProps {
  name: string,
  label: string,
  type?: string,
  disabled?: boolean
}

export const FormInput = ({ name, label, type, disabled }: InputFormProps) => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <FormControl mb={2}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={name}
        name={name}
        value={_.get(values, name) || ''}
        onChange={handleChange}
        placeholder={label}
        variant='filled'
        type={type}
        disabled={disabled}
      />
    </FormControl>
  );
};
