import { Checkbox } from '@chakra-ui/react';
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
      isChecked={_.get(values, name)}
      mb={2}
      placeholder={label}
      onChange={({ currentTarget: { checked } }) => setFieldValue(name, checked)}
    >
      {label}
    </Checkbox>
  );
};
