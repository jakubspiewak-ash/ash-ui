import { useEffect, useMemo } from 'react';

import { FormControl, FormLabel, InputGroup, NumberInput, NumberInputField, Select } from '@chakra-ui/react';

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
    const { register, setValue, watch } = form;

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

    useEffect(() => {
        setValue(names.gross, netValue ? calculateGross(netValue, vatValue) : '');
    }, [netValue, vatValue]);

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
                <Select
                  borderEndRadius={0}
                  defaultValue={23}
                  id={names.currency}
                  {...register(names.currency)}

                >
                    {currencies.map(CurrencyOption)}
                </Select>
                <NumberInput
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
                  {...register(names.vat)}

                >
                    {vatRates.map(VatRateOption)}
                </Select>
                <NumberInput
                  precision={2}
                  value={grossValue}
                  variant={'filled'}
                  width={'full'}
                  onBlur={() => setValue(names.gross, formatNumber(grossValue))}
                  onChange={(value) => setValue(names.gross, value)}
                >
                    <NumberInputField
                      borderStartRadius={0}
                      p={2}
                      placeholder={'Gross'}
                      {...register(names.gross)}
                    />
                </NumberInput>
            </InputGroup>
        </FormControl>
    );
};