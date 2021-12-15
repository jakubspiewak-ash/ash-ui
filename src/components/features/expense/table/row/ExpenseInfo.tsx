import React, { ReactNode, useMemo } from 'react';

import { Box, Flex, Grid, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { MdOutlineAttachFile, MdOutlineMail } from 'react-icons/all';

import { ApiExpense } from '../../../../../services/api.types';
import { getDatesDiff } from '../../../../../utils/time';
import { formatNumber } from '../../summary/CurrencySummary';

import { Date as DateComponent, IsPrivate } from './cell';

const InfoBox = ({ children }: { children: ReactNode }) => {
    return (
        <Box
          borderRadius={8}
          borderWidth={1}
          p={4}
        >
            {children}
        </Box>
    );
};

interface ExpenseInfoProps {
    expense: ApiExpense;
}

export const ExpenseInfo = (props: ExpenseInfoProps) => {

    const { expense } = props;
    const { isPrivate, amount, mailConfig, date: { start, end } } = expense;
    const { net, currency, gross, vat } = amount;

    const dateDiff = useMemo(() => {
        if (!start || !end) {
            return '';
        }
        const { days, months, years } = getDatesDiff(new Date(end), new Date(start));
        return `${years ? `${years} years ` : ''} ${months ? `${months} months ` : ''} ${days ? `${days} days` : ''}`;
    }, [start, end]);

    const dateLeft = useMemo(() => {
        if (!end) {
            return '';
        }
        const { days, months, years } = getDatesDiff(new Date(end), new Date());
        return `Left ${years ? `${years} years ` : ''} ${months ? `${months} months ` : ''} ${days ? `${days} days` : ''}`;
    }, [start, end]);

    return (
        <VStack
          alignItems={'space-between'}
          p={4}
          pt={0}
        >
            <SimpleGrid
              columns={[1, null, 3, 3]}
              gap={4}
            >
                <InfoBox>
                    <Text fontSize={'2xl'}>{`${currency} ${formatNumber(gross)}`}</Text>
                    <Grid
                      columnGap={2}
                      mt={4}
                      templateColumns={'min-content 1fr'}
                    >
                        <Text>Net:</Text>
                        <Text>{formatNumber(net)}</Text>
                        <Text>Vat:</Text>
                        <Text>{`${vat}%`}</Text>
                        <Text
                          gridColumnEnd={3}
                          gridColumnStart={2}
                        >
                            {formatNumber(gross - net)}
                        </Text>
                    </Grid>
                </InfoBox>
                <InfoBox>
                    <VStack>
                        <IsPrivate expense={expense}/>
                        <Text fontSize={'2xl'}>{`${isPrivate ? 'Private' : 'Company'} expense`}</Text>
                    </VStack>
                </InfoBox>
                <InfoBox>
                    <DateComponent expense={expense}/>
                    <Flex
                      alignItems={'center'}
                      flexDirection={'column'}
                      mt={2}
                    >
                        <Text
                          fontSize={'sm'}
                        >
                            {dateDiff}
                        </Text>
                        <Text
                          fontSize={'sm'}
                        >
                            {dateLeft}
                        </Text>
                    </Flex>
                </InfoBox>
                {!mailConfig ? null : (
                    <InfoBox>
                        <Box>
                            <Text fontSize={'xl'}>Mail config:</Text>
                            <Grid
                              alignItems={'center'}
                              columnGap={2}
                              templateColumns={'min-content 1fr'}
                            >
                                <MdOutlineMail/>
                                <Text><i>{mailConfig.mailAddress}</i></Text>
                                <MdOutlineAttachFile/>
                                <Text><i>{mailConfig.attachmentPattern}</i></Text>
                            </Grid>
                        </Box>
                    </InfoBox>
                )}
            </SimpleGrid>
        </VStack>
    );
};