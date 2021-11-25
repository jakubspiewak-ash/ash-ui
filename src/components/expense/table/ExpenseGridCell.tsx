import { ReactNode } from "react";

import { GridItem } from "@chakra-ui/react";

interface ExpenseGridCellProps {
    children: ReactNode,
    size?: number,
    align?: 'start' | 'center' | 'end'
}

export const ExpenseGridCell = (props: ExpenseGridCellProps) => {
    const { children, size, align } = props;

    return (
        <GridItem
          colSpan={size || 1}
          display={'flex'}
          justifyContent={align}
          p={2}
        >
            {children}
        </GridItem>
    );
};