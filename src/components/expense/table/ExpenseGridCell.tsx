import { ReactNode } from "react";

import { GridItem, ScaleFade } from "@chakra-ui/react";

interface ExpenseGridCellProps {
    children: ReactNode,
    size?: number,
    hidden?: boolean
    align?: 'start' | 'center' | 'end'
}

export const ExpenseGridCell = (props: ExpenseGridCellProps) => {
    const { children, hidden, size, align } = props;

    return (
        <GridItem
          colSpan={size || 1}
          display={'flex'}
          p={2}
        >
            <ScaleFade
              in={!hidden}
              style={{
                    display: 'flex',
                    justifyContent: align,
                    width: '100%',
                }}
            >
                {children}
            </ScaleFade>
        </GridItem>
    );
};