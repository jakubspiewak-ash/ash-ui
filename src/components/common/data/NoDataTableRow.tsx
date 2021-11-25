import { GridItem, Heading } from "@chakra-ui/react";

interface NoDataTableRowProps {
    colsNumber: number
}

export const NoDataTableRow = ({ colsNumber }: NoDataTableRowProps) => {
    return (
        <GridItem
          colSpan={colsNumber}
          p={4}
        >
            <Heading textAlign='center'>No data</Heading>
        </GridItem>
    );
};
