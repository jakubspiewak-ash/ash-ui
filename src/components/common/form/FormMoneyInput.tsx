import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    InputGroup,
    NumberInput,
    NumberInputField,
    Select
} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import _ from "lodash";
import {useEffect, useState} from "react";
import {FormAmount} from "../../../providers/ExpenseContextProvider";

const currenciesCodes = ['PLN', 'EUR', 'DOL'];
const vatValues = [0, 5, 8, 23];


interface MoneyInputProps {
    label: string,
    field: string,
    isDisabledVat?: boolean,
    isDisabledGross?: boolean,
}

interface HasAmount {
    [key: string]: FormAmount;
}

export const FormMoneyInput = ({label, field, isDisabledVat, isDisabledGross}: MoneyInputProps) => {
    const {values, setFieldValue, errors, touched, handleBlur, handleChange, } = useFormikContext<HasAmount>();

    const [localGross, setLocalGross] = useState<string>();

    const setFormCurrency = (value: string) => setFieldValue(`${field}.currency`, value)
    const setFormVat = (value: number) => setFieldValue(`${field}.vat`, value)
    const setFormNet = (value?: number) => setFieldValue(`${field}.net`, value)
    const setFormGross = (value?: number) => setFieldValue(`${field}.gross`, value)

    const getFormCurrency = (): string => _.get(values, [...field.split("."), 'currency'])
    const getFormVat = (): number => _.get(values, [...field.split("."), 'vat'])
    const getFormNet = (): number | undefined => _.get(values, [...field.split("."), 'net'])
    const getFormGross = (): number | undefined => _.get(values, [...field.split("."), 'gross'])

    const calculateGross = (net: number, vat: number): number => net * ((100 + vat) / 100);
    const calculateNet = (gross: number, vat: number): number => gross / ((100 + vat) / 100);

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
            setLocalGross(formGross.toFixed(2))
        }

    }, [getFormGross()])

    return (
        <FormControl
            mb={4}
            isInvalid={isFormInvalid()}
        >
            <FormLabel>
                <FormErrorIcon
                    mr={2}
                    color={"red.400"}
                />
                {label}
            </FormLabel>
            <InputGroup
                boxShadow={'lg'}
            >
                <Select
                    borderEndRadius={0}
                    padding={0}
                    w={48}
                    isInvalid={false}
                    variant={'outline'}
                    value={getFormCurrency()}
                    onChange={({currentTarget: {value}}) => setFormCurrency(value)}
                >
                    {currenciesCodes.map(renderCurrencyOption)}
                </Select>
                <NumberInput
                    variant='filled'
                    precision={2}
                    isInvalid={(!!_.get(errors, `${field}.net`) && !!_.get(touched, `${field}.net`))}
                >
                    <NumberInputField
                        id={`${field}.net`}
                        name={`${field}.net`}
                        value={getFormNet()}
                        onChange={({target: {value}}) => setFormNet(parseAndRoundFloat(value))}
                        onBlur={handleBlur}
                        placeholder={'Net'}
                        borderRadius={0}
                    />
                </NumberInput>
                <Select
                    w={48}
                    borderRadius={0}
                    disabled={isDisabledVat}
                    variant={'outline'}
                    isInvalid={false}
                    value={getFormVat()}
                    onChange={({currentTarget: {value}}) => setFormVat(parseInt(value))}
                >
                    {vatValues.map(renderVatOption)}
                </Select>
                <NumberInput
                    variant='filled'
                    precision={2}
                    value={localGross}
                    isInvalid={(!!_.get(errors, `${field}.gross`) && !!_.get(touched, `${field}.gross`))}
                    isDisabled={isDisabledGross}
                >
                    <NumberInputField
                        id={`${field}.gross`}
                        name={`${field}.gross`}
                        value={getFormGross()}
                        onChange={({target: {value}}) => {
                            setLocalGross(value);
                            setFormGross(parseAndRoundFloat(value));
                        }}
                        onBlur={e => {
                            setLocalGross(getFormGross()?.toFixed(2))
                            handleBlur(e);
                        }}
                        placeholder={'Gross'}
                        borderStartRadius={0}
                    />
                </NumberInput>
            </InputGroup>
            <FormErrorMessage>{_.get(touched, `${field}.net`) && _.get(errors, `${field}.net`)}</FormErrorMessage>
            <FormErrorMessage>{_.get(touched, `${field}.gross`) && _.get(errors, `${field}.gross`)}</FormErrorMessage>
        </FormControl>
    )
}

const renderCurrencyOption = (currency: string) => {
    return (
        <option
            key={currency}
            value={currency}
        >
            {currency}
        </option>
    );
}
const renderVatOption = (vat: number) => {
    return (
        <option
            key={vat.toString()}
            value={vat}
            style={{padding: 0}}
        >
            {`${vat}%`}
        </option>
    );
}

const roundFloat = (num: number, fractionalDigits: number): number => {
    return parseFloat(num.toFixed(fractionalDigits))
}

const parseAndRoundFloat = (value: string): number | undefined => {
    return value === '' || !value ? undefined : parseFloat(value);
}
