import { useMemo } from 'react';

import { Divider, Grid, Text, VStack } from '@chakra-ui/react';

import { getDatesDiff } from '../../../../../../../utils/time';
import { HasExpense } from '../../types';
import { InfoBox } from '../InfoBox';

export const DateRange = (props: HasExpense) => {
    const { expense } = props;
    const { date: { start, end } } = expense;

    if (!start && !end) {
        return null;
    }

    if (start && !end) {
        const localeStart = new Date(start).toLocaleDateString();
        return (
            <InfoBox>
                <Text>{localeStart}</Text>
            </InfoBox>
        );
    }


    const dateLeft = useMemo(() => {
        const { days, months, years } = getDatesDiff(new Date(end || ''), new Date());
        if ((days || 0) < 0 || (months || 0) < 0 || (years || 0) < 0) {
            return 'Last month';
        }
        return `Left ${years ? `${years} years ` : ''} ${months ? `${months} months ` : ''} ${days ? `${days} days` : ''}`;
    }, [start, end]);

    if (end && !start) {
        const localeEnd = new Date(end).toLocaleDateString();
        return (
            <InfoBox>
                <Text>{localeEnd}</Text>
                <Text>{dateLeft}</Text>
            </InfoBox>
        );
    }

    const localeStart = new Date(start || '').toLocaleDateString();
    const localeEnd = new Date(end || '').toLocaleDateString();

    const dateDiff = useMemo(() => {
        const { days, months, years } = getDatesDiff(new Date(end || ''), new Date(start || ''));
        return `${years ? `${years} years ` : ''} ${months ? `${months} months ` : ''} ${days ? `${days} days` : ''}`;
    }, [start, end]);

    return (
        <InfoBox>
            <VStack>
                <Grid
                  gap={2}
                  templateColumns={'auto 1fr'}
                >
                    <Text fontSize={'xl'}>{'Start:'}</Text>
                    <Text fontSize={'xl'}>{localeStart}</Text>
                    <Text fontSize={'xl'}>{'End:'}</Text>
                    <Text fontSize={'xl'}>{localeEnd}</Text>
                </Grid>
                <Divider/>
                <Text fontSize={'sm'}>{dateLeft}</Text>
                <Text fontSize={'sm'}>{dateDiff}</Text>
            </VStack>
        </InfoBox>
    );
};