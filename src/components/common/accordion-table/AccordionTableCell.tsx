import { ReactNode } from 'react';

import { GridItem } from '@chakra-ui/react';

interface AccordionTableCellProps {
    children: ReactNode
}

export const AccordionTableCell = (props: AccordionTableCellProps) => {
    const { children } = props;
    return (
        <GridItem>
            {children}
        </GridItem>
    );
};