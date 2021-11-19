import { ChangeEventHandler, useEffect } from 'react';

import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

export const formatNumber = (num: number) => num < 10 ? `0${num}` : num;
const dateToString = (date?: Date): string => date ? `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())}` : '';
const stringToDate = (date?: string) => (!date || date === '') ? undefined : new Date(date);

interface FormDateRangeInputProps {
    label: string,
    field: string,
    disabledStart?: boolean,
    disabledEnd?: boolean,
}


export const FormDateRangeInput = ({ label, field, disabledStart, disabledEnd }: FormDateRangeInputProps) => {
    const {
        values,
        setFieldValue,
        errors,
        touched,
        handleBlur,
    } = useFormikContext<{ date: { start: Date, end: Date } }>();


    const onStartChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
        const { value } = currentTarget;
        setFieldValue(`${field}.start`, stringToDate(value));
        // IOS safari workaround
        setTimeout(() => {
            currentTarget.defaultValue = '';
        }, 100);
    };

    const onEndChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
        const { value } = currentTarget;
        setFieldValue(`${field}.end`, stringToDate(value));
        // IOS safari workaround
        setTimeout(() => {
            currentTarget.defaultValue = '';
        }, 100);
    };


    const isFormInvalid = (): boolean =>
        (!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`)) ||
        (!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`));

    useEffect(() => {
        const start = _.get(values, `${field}.start`);
        if (!start) {
            setFieldValue(`${field}.start`, '', false);
        }
        const end = _.get(values, `${field}.end`);
        if (!end) {
            setFieldValue(`${field}.end`, '', false);
        }
    }, []);

    return (
        <FormControl
          isInvalid={isFormInvalid()}
          mb={4}
        >
            <FormLabel
              alignItems={'center'}
              display={'flex'}
            >
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
                  defaultValue={''}
                  disabled={disabledStart}
                  id={`${field}.start`}
                  isInvalid={(!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`))}
                  name={`${field}.start`}
                  placeholder={'Start'}
                  type={'date'}
                  value={dateToString(_.get(values, `${field}.start`))}
                  variant={'filled'}
                  onBlur={(e) => {
                        handleBlur(e);
                    }}
                  onChange={onStartChange}
                />
                <Input
                  borderStartRadius={0}
                  defaultValue={""}
                  disabled={disabledEnd}
                  id={`${field}.end`}
                  isInvalid={(!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`))}
                  name={`${field}.end`}
                  placeholder={'End'}
                  type={'date'}
                  value={dateToString(_.get(values, `${field}.end`))}
                  variant={'filled'}
                  onBlur={(e) => {
                        handleBlur(e);
                    }}
                  onChange={onEndChange}
                />
            </InputGroup>
            <FormErrorMessage>{!!_.get(touched, `${field}.start`) && _.get(errors, `${field}.start`)}</FormErrorMessage>
            <FormErrorMessage>{!!_.get(touched, `${field}.end`) && _.get(errors, `${field}.end`)}</FormErrorMessage>
        </FormControl>
    );
};
