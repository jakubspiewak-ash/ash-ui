import {Checkbox, FormControl, FormLabel, Input} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export interface FormCheckboxProps {
  name: string,
  label: string,
}

export const FormCheckbox = ({ name, label }: FormCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Checkbox
        mb={2}
        isChecked={_.get(values, name)}
        onChange={({currentTarget: {checked}}) => setFieldValue(name, checked)}
        placeholder={label}
    >
        {label}
    </Checkbox>
  );
};
