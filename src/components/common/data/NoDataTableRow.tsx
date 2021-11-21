import { Box, Heading } from "@chakra-ui/react";

interface NoDataTableRowProps {
    colsNumber: number
}

export const NoDataTableRow = ({ colsNumber }: NoDataTableRowProps) => {
    return (
        <Box colSpan={colsNumber}>
            <Heading textAlign='center'>No data</Heading>
        </Box>
    );
};
