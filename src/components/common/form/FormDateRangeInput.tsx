import { useState } from 'react';

import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

const formatNumber = (num: number) => num < 10 ? `0${num}` : num;
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

  const [startDateType, setStartDateType] = useState<'date' | 'text'>('text');
  const [endDateType, setEndDateType] = useState<'date' | 'text'>('text');

  const isFormInvalid = (): boolean =>
    (!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`)) ||
    (!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`));

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
          disabled={disabledStart}
          id={`${field}.start`}
          isInvalid={(!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`))}
          name={`${field}.start`}
          placeholder={'Start'}
          type={startDateType}
          value={dateToString(_.get(values, `${field}.start`))}
          variant={'filled'}
          onBlur={(e) => {
            handleBlur(e);
            setStartDateType('text');
          }}
          onChange={({ currentTarget: { value } }) => setFieldValue(`${field}.start`, stringToDate(value))}
          onFocus={() => setStartDateType('date')}
        />
        <Input
          borderStartRadius={0}
          disabled={disabledEnd}
          id={`${field}.end`}
          isInvalid={(!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`))}
          name={`${field}.end`}
          placeholder={'End'}
          type={endDateType}
          value={dateToString(_.get(values, `${field}.end`))}
          variant={'filled'}
          onBlur={(e) => {
            handleBlur(e);
            setEndDateType('text');
          }}
          onChange={({ currentTarget: { value } }) => setFieldValue(`${field}.end`, stringToDate(value))}
          onFocus={() => setEndDateType('date')}
        />
      </InputGroup>
      <FormErrorMessage>{!!_.get(touched, `${field}.start`) && _.get(errors, `${field}.start`)}</FormErrorMessage>
      <FormErrorMessage>{!!_.get(touched, `${field}.end`) && _.get(errors, `${field}.end`)}</FormErrorMessage>
    </FormControl>
  );
};
