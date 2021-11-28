import { useMemo } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { ApiExpenseSummary } from '../../../services/api.types';

import { CurrencySummary } from './CurrencySummary';
import { MainSummary } from './MainSummary';


export const ExpenseSummary = ({ amount, currency, date }: ApiExpenseSummary) => {

    const CurrenciesComponent = useMemo(() => {
        if (currency.length > 1) {
            return currency
                .sort((a, b) => b.gross - a.gross)
                .map(CurrencySummary);
        }
        return null;
    }, [currency]);

    return (
        <>
            <MainSummary
              amount={amount}
              date={date}
            />
            <SimpleGrid
            // eslint-disable-next-line sort-keys
              columns={[2, 2, 3, 4]}
              gap={3}
              mt={3}
            >
                {CurrenciesComponent}
            </SimpleGrid>
        </>
    );
};