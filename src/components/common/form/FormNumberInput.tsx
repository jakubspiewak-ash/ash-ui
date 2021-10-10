import {
  FormControl, FormLabel, InputGroup, InputLeftAddon, NumberInput, NumberInputField,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export interface FormNumberInputProps {
    name: string,
    label: string,
    type?: string
}

export const FormNumberInput = ({ name, label, type }: FormNumberInputProps) => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <FormControl mb={4}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftAddon>
          PLN
        </InputLeftAddon>
        <NumberInput
          id={name}
          name={name}
          placeholder={label}
          variant="filled"
          type={type}
          width="full"
          value={values[name]}
          precision={2}
        >
          <NumberInputField
            placeholder={label}
            variant="filled"
            value={values[name]}
            onChange={handleChange}
          />
        </NumberInput>
      </InputGroup>
    </FormControl>
  );
};
