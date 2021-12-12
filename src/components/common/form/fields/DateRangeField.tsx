import { useEffect, useMemo } from 'react';

import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';

import { Field } from './types';

export interface DateInputFieldProps {
    field: Field,
}

export const DateRangeField = (props: DateInputFieldProps) => {
    const { field: { label, name, form } } = props;
    const { register, setValue, watch, formState: { errors } } = form;

    const names = useMemo(() => {
        return {
            end: `${name}.end`,
            start: `${name}.start`,
        };
    }, [name]);

    const startValue = watch(names.start);
    const endValue = watch(names.end);

    useEffect(() => {
        if (startValue === '') {
            setValue(names.start, undefined, { shouldValidate: true });
        }
    }, [startValue]);

    useEffect(() => {
        if (endValue === '') {
            setValue(names.end, undefined, { shouldValidate: true });
        }
    }, [endValue]);

    return (
        <FormControl
          isInvalid={errors[name]}
          mb={4}
        >
            <FormLabel>
                <FormErrorIcon
                  color={'red.400'}
                  mr={2}
                />
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
            <FormErrorMessage>{errors[name]?.start?.message || errors[name]?.end?.message}</FormErrorMessage>
        </FormControl>
    );
};