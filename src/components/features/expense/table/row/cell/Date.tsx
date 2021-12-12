import { Icon } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';
import { IoInfiniteSharp } from 'react-icons/all';

import { ExpenseGridItemProps } from './index';

export const InfiniteIcon = () => <Icon as={IoInfiniteSharp}/>;


export const Date = ({ expense }: ExpenseGridItemProps) => {
    const { date: { start, end } } = expense;
    return (
        <Grid
          gridGap={1}
          templateColumns={'repeat(2, 1fr)'}
          templateRows={'repeat(2, 1fr)'}
          width={'full'}
        >
            <GridItem as={'b'}>From:</GridItem>
            <GridItem textAlign={'center'}>
                {start || <InfiniteIcon/>}
            </GridItem>
            <GridItem as={'b'}>To:</GridItem>
            <GridItem textAlign={'center'}>
                {end || <InfiniteIcon/>}
            </GridItem>
        </Grid>
    );
};