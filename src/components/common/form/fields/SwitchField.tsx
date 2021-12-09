import { FormControl, Switch } from '@chakra-ui/react';

import { Field } from './types';

export interface SwitchFieldProps {
    field: Field;
}

export const SwitchField = (props: SwitchFieldProps) => {
    const { field: { name, label, form } } = props;
    const { register } = form;


    return (
        <FormControl
          display={'flex'}
          mb={4}
          verticalAlign={'center'}
        >
            <Switch {...register(name)}>{label}</Switch>
        </FormControl>
    );

};