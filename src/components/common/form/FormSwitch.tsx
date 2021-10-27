import { Switch } from '@chakra-ui/react';
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
          isChecked={_.get(values, field)}
          mb={4}
          placeholder={label}
          onChange={({ currentTarget: { checked } }) => setFieldValue(field, checked)}
        >
            {label}
        </Switch>
    );
};
