import {FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input, InputGroup} from "@chakra-ui/react";
import _ from "lodash";
import {useFormikContext} from "formik";
import {useState} from "react";

interface FormDateRangeInputProps {
    label: string,
    field: string,
    disabledStart?: boolean,
    disabledEnd?: boolean,
}

export const FormDateRangeInput = ({label, field, disabledStart, disabledEnd}: FormDateRangeInputProps) => {
    const {
        values,
        setFieldValue,
        errors,
        touched,
        handleBlur
    } = useFormikContext<{ date: { start: Date, end: Date } }>();

    const [startDateType, setStartDateType] = useState<'date' | 'text'>("text");
    const [endDateType, setEndDateType] = useState<'date' | 'text'>("text");

    const isFormInvalid = (): boolean =>
        (!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`)) ||
        (!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`))

    return (
        <FormControl
            mb={4}
            isInvalid={isFormInvalid()}
        >
            <FormLabel
                display={"flex"}
                alignItems={"center"}
            >
                <FormErrorIcon
                    mr={2}
                    color={"red.400"}
                />
                {label}
            </FormLabel>
            <InputGroup
                boxShadow={'lg'}
            >
                <Input
                    id={`${field}.start`}
                    name={`${field}.start`}
                    isInvalid={(!!_.get(errors, `${field}.start`) && !!_.get(touched, `${field}.start`))}
                    value={dateToString(_.get(values, `${field}.start`))}
                    onChange={({currentTarget: {value}}) => setFieldValue(`${field}.start`, stringToDate(value))}
                    onBlur={e => {
                        handleBlur(e);
                        setStartDateType('text')
                    }}
                    onFocus={() => setStartDateType('date')}
                    placeholder={'Start'}
                    variant={'filled'}
                    type={startDateType}
                    disabled={disabledStart}
                    borderEndRadius={0}
                />
                <Input
                    id={`${field}.end`}
                    name={`${field}.end`}
                    isInvalid={(!!_.get(errors, `${field}.end`) && !!_.get(touched, `${field}.end`))}
                    value={dateToString(_.get(values, `${field}.end`))}
                    onChange={({currentTarget: {value}}) => setFieldValue(`${field}.end`, stringToDate(value))}
                    onBlur={e => {
                        handleBlur(e);
                        setEndDateType('text');
                    }}
                    onFocus={() => setEndDateType('date')}
                    placeholder={'End'}
                    variant={'filled'}
                    type={endDateType}
                    disabled={disabledEnd}
                    borderStartRadius={0}
                />
            </InputGroup>
            <FormErrorMessage>{!!_.get(touched, `${field}.start`) && _.get(errors, `${field}.start`)}</FormErrorMessage>
            <FormErrorMessage>{!!_.get(touched, `${field}.end`) && _.get(errors, `${field}.end`)}</FormErrorMessage>
        </FormControl>
    );
}

const formatNumber = (num: number) => num < 10 ? `0${num}` : num;

const dateToString = (date?: Date): string => date ? `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())}` : '';

const stringToDate = (date?: string) => (!date || date === '') ? undefined : new Date(date);