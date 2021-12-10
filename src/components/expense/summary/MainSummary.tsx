import { Center, SimpleGrid, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';

import { useAppDispatch } from '../../../redux/hooks';
import { loadExpenses } from '../../../redux/reducer/ExpenseSlice';
import { ApiExpenseAmount, ApiExpenseDateRange } from '../../../services/api.types';
import { YearMonth } from '../../../utils/types';
import { SearchByMonth } from '../../common/SearchByMonth';

import { formatNumber } from './CurrencySummary';

export interface MainSummaryProps {
    amount: ApiExpenseAmount,
    date: ApiExpenseDateRange
}

export const MainSummary = ({ amount: { net, gross, currency, vat } }: MainSummaryProps) => {
    const dispatch = useAppDispatch();
    const updateData = (month: YearMonth) => dispatch(loadExpenses(month));

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
                    <StatNumber>{`${currency} | ${formatNumber(gross)}`}</StatNumber>
                    <StatHelpText>
                        <SimpleGrid
                          columnGap={8}
                          columns={2}
                        >
                            <Text><b>Net: </b>{formatNumber(net)}</Text>
                            <Text><b>Vat: </b>{formatNumber(vat)}</Text>
                        </SimpleGrid>
                    </StatHelpText>
                    <StatHelpText>
                    </StatHelpText>
                    <SearchByMonth
                      label={'Accounting month'}
                      onSearch={updateData}
                    />
                </VStack>
            </Center>
        </Stat>
    );
};