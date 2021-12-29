import { GridItem, Heading } from '@chakra-ui/react';

interface NoDataTableRowProps {
    size: number
}

export const NoDataTableRow = ({ size }: NoDataTableRowProps) => {
    return (
        <GridItem
          colSpan={size}
          p={4}
        >
            <Heading textAlign='center'>No data</Heading>
        </GridItem>
    );
};
