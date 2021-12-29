import { Grid, Text } from '@chakra-ui/react';

import { formatNumber } from '../../../../../../../utils/functions';
import { HasExpense } from '../../types';
import { InfoBox } from '../InfoBox';

export const Amount = (props: HasExpense) => {
    const { expense } = props;
    const { amount: { net, currency, vat, gross } } = expense;

    return (
        <InfoBox>
            <Text fontSize={'2xl'}>{`${currency} ${formatNumber(gross)}`}</Text>
            <Grid
              gridGap={1}
              mt={4}
              templateColumns={'auto 1fr'}
            >
                <Text fontSize={'lg'}>Net:</Text>
                <Text fontSize={'lg'}>{`${formatNumber(net)}`}</Text>
                <Text fontSize={'lg'}>Vat:</Text>
                <Text fontSize={'lg'}>{`${formatNumber(gross - net)} (${vat}%)`}</Text>
            </Grid>
        </InfoBox>
    );
};