import { Stat, StatHelpText, StatNumber, Text } from "@chakra-ui/react";

import { ApiExpenseAmount } from "../../../services/api.types";

export interface CurrencySummaryProps {
    currency: string,
    amount: number
}


export function formatNumber(x: number) {
    const y = x.toFixed(2);
    const parts = y.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

export const CurrencySummary = ({ currency, net, gross, vat }: ApiExpenseAmount) => {
    return (
        <Stat
          borderRadius={16}
          borderWidth={1}
          boxShadow={'md'}
          mb={3}
          p={3}
        >
            <StatNumber>{`${currency} | ${formatNumber(gross)}`}</StatNumber>
            <StatHelpText>
                <Text><b>Net: </b>{formatNumber(net)}</Text>
                <Text><b>Vat: </b>{formatNumber(vat)}</Text>
            </StatHelpText>
        </Stat>
    );
};