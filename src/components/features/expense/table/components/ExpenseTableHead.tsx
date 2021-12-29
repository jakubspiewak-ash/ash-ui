import { Th, Tr } from '@chakra-ui/react';

import { useIsMdBreakpoint } from '../../../../../utils/hooks';

export const ExpenseTableHead = () => {
    const md = useIsMdBreakpoint();

    return (
        <Tr>
            <Th width={'75%'}>Name</Th>
            <Th hidden={!md}>Amount</Th>
            <Th hidden={!md}>Currency</Th>
            <Th hidden={!md}>Is private</Th>
            <Th>Info</Th>
        </Tr>
    );
};