import { Checkbox } from '@chakra-ui/react';
import _ from 'lodash';

export interface FormCheckboxProps {
  name: string,
  label: string,
}

export const FormCheckbox = ({ name, label }: FormCheckboxProps) => {

  return (
    <Checkbox
      // isChecked={_.get(values, name)}
      mb={2}
      placeholder={label}
      // onChange={({ currentTarget: { checked } }) => setFieldValue(name, checked)}
    >
      {label}
    </Checkbox>
  );
};
