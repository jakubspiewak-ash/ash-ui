import { useEffect, useState } from 'react';

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
import { useFormikContext } from 'formik';
import _ from 'lodash';

import { FormAmount } from '../../../providers/ExpenseContextProvider';

const currenciesCodes = ['PLN', 'EUR', 'DOL'];
const vatValues = [0, 5, 8, 23];


interface MoneyInputProps {
    label: string,
    field: string,
    isDisabledVat?: boolean,
    isDisabledGross?: boolean,
}

// const roundFloat = (num: number, fractionalDigits: number): number => parseFloat(num.toFixed(fractionalDigits));
const parseAndRoundFloat = (value: string): number | undefined => value === '' || !value ? undefined : parseFloat(value);

const renderCurrencyOption = (currency: string) => {
    return (
        <option
          key={currency}
          value={currency}
        >
            {currency}
        </option>
    );
};

const renderVatOption = (vat: number) => {
    return (
        <option
          key={vat.toString()}
          style={{ padding: 0 }}
          value={vat}
        >
            {`${vat}%`}
        </option>
    );
};

interface HasAmount {
    [key: string]: FormAmount;
}

export const FormMoneyInput = ({ label, field, isDisabledVat, isDisabledGross }: MoneyInputProps) => {
    const { values, setFieldValue, errors, touched, handleBlur } = useFormikContext<HasAmount>();

    const [localGross, setLocalGross] = useState<string>();
    const [localNet, setLocalNet] = useState<string>();

    const setFormCurrency = (value: string) => setFieldValue(`${field}.currency`, value);
    const setFormVat = (value: number) => setFieldValue(`${field}.vat`, value);
    const setFormNet = (value?: number) => setFieldValue(`${field}.net`, value);
    const setFormGross = (value?: number) => setFieldValue(`${field}.gross`, value);

    const getFormCurrency = (): string => _.get(values, [...field.split('.'), 'currency']);
    const getFormVat = (): number => _.get(values, [...field.split('.'), 'vat']);
    const getFormNet = (): number | undefined => _.get(values, [...field.split('.'), 'net']);
    const getFormGross = (): number | undefined => _.get(values, [...field.split('.'), 'gross']);

    const calculateGross = (net: number, vat: number): number => net * ((100 + vat) / 100);
    // const calculateNet = (gross: number, vat: number): number => gross / ((100 + vat) / 100);

    const isFormInvalid = (): boolean =>
        (!!_.get(errors, `${field}.net`) && !!_.get(touched, `${field}.net`)) ||
        (!!_.get(errors, `${field}.gross`) && !!_.get(touched, `${field}.gross`));

    useEffect(() => {
        const formNet = getFormNet();
        if (formNet) {
            const calculatedGross = calculateGross(formNet, getFormVat());
            setFormGross(calculatedGross);

        } else {
            setFormGross(undefined);
            setLocalNet('');
        }
    }, [getFormNet(), getFormVat()]);

    useEffect(() => {
        const formGross = getFormGross();
        if (!formGross) {
            setLocalGross('');
            return;
        }
        const parsedGross = parseFloat(localGross || '0');

        if (formGross !== parsedGross) {
            setLocalGross(formGross.toFixed(2));
        }
    }, [getFormGross()]);

    useEffect(() => {
        const formNet = getFormNet();
        if (formNet) {
            setLocalNet(formNet.toFixed(2));
        }
    }, []);

    return (
        <FormControl
          isInvalid={isFormInvalid()}
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
                  isInvalid={false}
                  padding={0}
                  value={getFormCurrency()}
                  variant={'outline'}
                  w={48}
                  onChange={({ currentTarget: { value } }) => setFormCurrency(value)}
                >
                    {currenciesCodes.map(renderCurrencyOption)}
                </Select>
                <NumberInput
                  isInvalid={(!!_.get(errors, `${field}.net`) && !!_.get(touched, `${field}.net`))}
                  precision={2}
                  value={localNet}
                  variant='filled'
                >
                    <NumberInputField
                      borderRadius={0}
                      id={`${field}.net`}
                      name={`${field}.net`}
                      paddingInlineEnd={2}
                      paddingInlineStart={2}
                      placeholder={'Net'}
                      value={getFormNet()}
                      onBlur={(e) => {
                            setLocalNet(getFormNet()?.toFixed(2));
                            handleBlur(e);
                        }}
                      onChange={({ target: { value } }) => {
                            setLocalNet(value);
                            setFormNet(parseAndRoundFloat(value));
                        }}
                    />
                </NumberInput>
                <Select
                  borderRadius={0}
                  disabled={isDisabledVat}
                  isInvalid={false}
                  value={getFormVat()}
                  variant={'outline'}
                  w={48}
                  onChange={({ currentTarget: { value } }) => setFormVat(parseInt(value))}
                >
                    {vatValues.map(renderVatOption)}
                </Select>
                <NumberInput
                  isDisabled={isDisabledGross}
                  isInvalid={(!!_.get(errors, `${field}.gross`) && !!_.get(touched, `${field}.gross`))}
                  precision={2}
                  value={localGross}
                  variant='filled'
                >
                    <NumberInputField
                      borderStartRadius={4}
                      id={`${field}.gross`}
                      name={`${field}.gross`}
                      paddingInlineEnd={2}
                      paddingInlineStart={2}
                      placeholder={'Gross'}
                      value={getFormGross()}
                      onBlur={(e) => {
                            setLocalGross(getFormGross()?.toFixed(2));
                            handleBlur(e);
                        }}
                      onChange={({ target: { value } }) => {
                            setLocalGross(value);
                            setFormGross(parseAndRoundFloat(value));
                        }}
                    />
                </NumberInput>
            </InputGroup>
            <FormErrorMessage>{_.get(touched, `${field}.net`) && _.get(errors, `${field}.net`)}</FormErrorMessage>
            <FormErrorMessage>{_.get(touched, `${field}.gross`) && _.get(errors, `${field}.gross`)}</FormErrorMessage>
        </FormControl>
    );
};
