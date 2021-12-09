import { useMemo } from 'react';

import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';

import { Field } from './types';

export interface DateInputFieldProps {
    field: Field,
}

export const DateField = (props: DateInputFieldProps) => {
    const { field: { label, name, form: { register } } } = props;

    const names = useMemo(() => {
        return {
            end: `${name}.end`,
            start: `${name}.start`,
        };
    }, [name]);

    return (
        <FormControl
          mb={4}
        >
            <FormLabel>
                {label}
            </FormLabel>
            <InputGroup
              boxShadow={'lg'}
            >
                <Input
                  borderEndRadius={0}
                  id={name}
                  placeholder={label}
                  type={'date'}
                  variant={'filled'}
                  {...register(names.start)}
                />
                <Input
                  borderStartRadius={0}
                  id={name}
                  placeholder={label}
                  type={'date'}
                  variant={'filled'}
                  {...register(names.end)}
                />
            </InputGroup>
        </FormControl>
    );
};