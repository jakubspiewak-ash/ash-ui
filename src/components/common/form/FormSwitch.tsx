import { Switch } from '@chakra-ui/react';
import _ from 'lodash';


export interface FormCheckboxProps {
    field: string,
    label: string,
}

export const FormSwitch = ({ field, label }: FormCheckboxProps) => {
    return (
        <Switch
          // isChecked={_.get(values, field)}
          mb={4}
          placeholder={label}
          // onChange={({ currentTarget: { checked } }) => setFieldValue(field, checked)}
        >
            {label}
        </Switch>
    );
};
