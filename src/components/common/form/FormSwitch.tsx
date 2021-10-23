import {Checkbox, FormControl, FormLabel, Input, Switch} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export interface FormCheckboxProps {
  field: string,
  label: string,
}

export const FormSwitch = ({ field, label }: FormCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <Switch
        mb={4}
        isChecked={_.get(values, field)}
        onChange={({currentTarget: {checked}}) => setFieldValue(field, checked)}
        placeholder={label}
    >
        {label}
    </Switch>
  );
};
