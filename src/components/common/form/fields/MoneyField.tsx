import { useEffect, useMemo } from 'react';

import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    NumberInput,
    NumberInputField,
    Select,
} from '@chakra-ui/react';
import _ from 'lodash';

import { formatNumber } from '../../../../utils/functions';


import { Field } from './types';

const calculateGross = (value: number, vat: number): number => {
    const result = value * (1 + vat / 100);
    return Number(result.toFixed(2));
};

const vatRates = [0, 5, 8, 23];
const VatRateOption = (rate: number) => (
    <option value={rate}>{`${rate}%`}</option>
);

const currencies = ['PLN', 'EUR', 'DOL'];
const CurrencyOption = (currency: string) => (
    <option value={currency}>{currency}</option>
);

export interface MoneyInputFieldProps {
    field: Field;
}

export const MoneyField = (props: MoneyInputFieldProps) => {
    const { field: { name, form, label } } = props;
    const { register, setValue, watch, formState: { errors } } = form;

    const names = useMemo(() => {
        return {
            currency: `${name}.currency`,
            gross: `${name}.gross`,
            net: `${name}.net`,
            vat: `${name}.vat`,
        };
    }, [name]);

    const netValue = watch(names.net);
    const grossValue = watch(names.gross);
    const vatValue = watch(names.vat);

    const netError = _.get(errors, names.net);
    const grossError = _.get(errors, names.gross);

    useEffect(() => {
        if (netValue === '') {
            setValue(names.gross, undefined);
            setValue(names.net, undefined);
        } else if (netValue === undefined) {
            setValue(names.gross, undefined);
        } else {
            setValue(names.gross, calculateGross(netValue, vatValue), { shouldValidate: true });
        }
    }, [netValue, vatValue]);

    useEffect(() => {
        if (grossValue === '') {
            setValue(names.gross, undefined, { shouldValidate: true });
        }
    }, [grossValue]);

    return (
        <FormControl
          isInvalid={netError || grossError}
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
                <Select
                  borderEndRadius={0}
                  defaultValue={23}
                  id={names.currency}
                  isInvalid={false}
                  {...register(names.currency)}
                >
                    {currencies.map(CurrencyOption)}
                </Select>
                <NumberInput
                  isInvalid={netError}
                  precision={2}
                  variant={'filled'}
                  width={'full'}
                  onChange={(value) => setValue(names.net, formatNumber(value))}
                >
                    <NumberInputField
                      borderEndRadius={0}
                      borderStartRadius={0}
                      p={2}
                      placeholder={'Net'}
                      {...register(names.net)}
                    />
                </NumberInput>
                <Select
                  borderEndRadius={0}
                  borderStartRadius={0}
                  defaultValue={23}
                  id={names.vat}
                  isInvalid={false}
                  {...register(names.vat)}
                >
                    {vatRates.map(VatRateOption)}
                </Select>
                <NumberInput
                  isInvalid={grossError}
                  precision={2}
                  value={grossValue}
                  variant={'filled'}
                  width={'full'}
                  onBlur={() => setValue(names.gross, formatNumber(grossValue))}
                  onChange={(value) => setValue(names.gross, value, { shouldValidate: true })}
                >
                    <NumberInputField
                      borderStartRadius={0}
                      p={2}
                      placeholder={'Gross'}
                      {...register(names.gross)}
                    />
                </NumberInput>
            </InputGroup>
            <FormErrorMessage>{netError?.message || grossError?.message}</FormErrorMessage>
        </FormControl>
    );
};