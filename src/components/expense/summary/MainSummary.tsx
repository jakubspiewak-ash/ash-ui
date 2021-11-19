import { Center, SimpleGrid, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from "@chakra-ui/react";

import { useExpenseContext } from "../../../providers/ExpenseContextProvider";
import { ApiExpenseAmount, ApiExpenseDateRange } from "../../../services/api.types";
import { DateMonthInput } from "../../common/DateMonthInput";

import { numberWithSpaces } from "./CurrencySummary";

export interface MainSummaryProps {
    amount: ApiExpenseAmount,
    date: ApiExpenseDateRange
}

export const MainSummary = ({ amount: { net, gross, currency, vat } }: MainSummaryProps) => {
    const { updateData } = useExpenseContext();
    return (
        <Stat
          borderRadius={16}
          borderWidth={1}
          boxShadow={'md'}
          p={3}
        >
            <Center>
                <VStack>
                    <StatLabel>All expenses</StatLabel>
                    <StatNumber>{`${currency} | ${numberWithSpaces(gross)}`}</StatNumber>
                    <StatHelpText>
                        <SimpleGrid
                          columnGap={8}
                          columns={2}
                        >
                            <Text><b>Net: </b>{numberWithSpaces(net)}</Text>
                            <Text><b>Vat: </b>{numberWithSpaces(vat)}</Text>
                        </SimpleGrid>
                    </StatHelpText>
                    <StatHelpText>
                    </StatHelpText>
                    <DateMonthInput
                      label={'Accounting month'}
                      onSearch={updateData}
                    />
                </VStack>
            </Center>
        </Stat>
    );
};