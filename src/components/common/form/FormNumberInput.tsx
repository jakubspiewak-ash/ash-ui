import { FormControl, FormLabel, InputGroup, InputLeftAddon, NumberInput, NumberInputField } from '@chakra-ui/react';
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
                  precision={2}
                  type={type}
                  value={values[name]}
                  variant="filled"
                  width="full"
                >
                    <NumberInputField
                      placeholder={label}
                      value={values[name]}
                      variant="filled"
                      onChange={handleChange}
                    />
                </NumberInput>
            </InputGroup>
        </FormControl>
    );
};
