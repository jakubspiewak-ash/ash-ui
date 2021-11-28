import { ReactNode } from 'react';

import { Grid } from '@chakra-ui/react';

interface AccordionTableProps {
    children: ReactNode | ReactNode[],
    columns: number
}

export const AccordionTable = (props: AccordionTableProps) => {
    const { children, columns } = props;
    
    return (
        <Grid
          templateColumns={`repeat(${columns + 1}, 1fr)`}
        >
            {children}
        </Grid>
    );

};