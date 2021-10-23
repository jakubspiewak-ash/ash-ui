import {FormControl, FormLabel, InputGroup, NumberInput, NumberInputField, Select} from "@chakra-ui/react";
import {useFormikContext} from "formik";
import _ from "lodash";
import {useEffect, useState} from "react";
import {Amount} from "../../../services/api.types";

const currenciesCodes = ['PLN', 'EUR', 'DOL'];
const vatValues = [0, 5, 8, 23];


interface MoneyInputProps {
    label: string,
    field: string,
    disableVat?: boolean,
}

interface HasAmount {
    [key: string]: Amount;
}

export const FormMoneyInput = ({label, field, disableVat}: MoneyInputProps) => {
    const {values, setFieldValue} = useFormikContext<HasAmount>();

    const [localNet, setLocalNet] = useState<string>();
    const [localGross, setLocalGross] = useState<string>();


    const setFormCurrency = (value: string) => setFieldValue(`${field}.currency`, value)
    const setFormVat = (value: number) => setFieldValue(`${field}.vat`, value)
    const setFormNet = (value?: number) => setFieldValue(`${field}.net`, value)
    const setFormGross = (value?: number) => setFieldValue(`${field}.gross`, value)

    const getFormCurrency = (): string | undefined => _.get(values, [field, 'currency'])
    const getFormVat = (): number | undefined => _.get(values, [field, 'vat'])
    const getFormNet = (): number | undefined => _.get(values, [field, 'net'])
    const getFormGross = (): number | undefined => _.get(values, [field, 'gross'])

    const calculateGross = (net: number, vat: number) => net * ((100 + vat) / 100);

    useEffect(() => {
        if (!localNet || localNet === '') {
            setFormNet(undefined);
            setLocalGross(undefined);
            return;
        }
        const parsedNet = parseFloat(localNet || '0');
        if (parsedNet !== getFormNet()) {
            setFormNet(parsedNet);
            const calculatedGross = calculateGross(parsedNet, getFormVat() || 0);
            setFormGross(calculatedGross);
            setLocalGross(calculatedGross.toFixed(2))
        }
    }, [localNet]);

    useEffect(() => {
        if (!localGross || localGross === '') {
            setFormGross(undefined);
            return;
        }
        const parsedGross = parseFloat(localGross || '0');
        if (parsedGross !== getFormGross()) {
            setFormGross(parsedGross);
        }
    }, [localGross]);

    useEffect(() => {
        const formNet = getFormNet();
        if (formNet) {
            const calculatedGross = calculateGross(formNet, getFormVat() || 0);
            setLocalGross(calculatedGross.toFixed(2));
            setFormGross(calculatedGross);
        }
    }, [getFormVat()]);


    return (
        <FormControl mb={4}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <Select
                    borderEndRadius={0}
                    padding={0}
                    w={48}
                    value={getFormCurrency()}
                    onChange={({currentTarget: {value}}) => setFormCurrency(value)}
                >
                    {currenciesCodes.map(renderCurrencyOption)}
                </Select>
                <NumberInput
                    variant='filled'
                    precision={2}
                    value={localNet}
                    onChange={(value, _) => setLocalNet(value)}
                >
                    <NumberInputField
                        borderRadius={0}
                        placeholder={'Net'}
                    />
                </NumberInput>
                <Select
                    w={48}
                    borderRadius={0}
                    disabled={disableVat}
                    value={getFormVat()}
                    onChange={({currentTarget: {value}}) => setFormVat(parseInt(value))}
                >
                    {vatValues.map(renderVatOption)}
                </Select>
                <NumberInput
                    variant='filled'
                    precision={2}
                    value={localGross}
                    onChange={(value, _) => setLocalGross(value)}
                >
                    <NumberInputField
                        borderStartRadius={0}
                        placeholder={'Gross'}
                    />
                </NumberInput>
            </InputGroup>
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

// const parseAndRoundFloat = (value: string): number | undefined => {
//     console.log(value)
//     return value === '' ? undefined : parseFloat(value);
// }
