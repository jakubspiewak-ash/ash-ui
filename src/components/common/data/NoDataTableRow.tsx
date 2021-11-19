import { Heading, Td, Tr } from "@chakra-ui/react";

interface NoDataTableRowProps {
    colsNumber: number
}

export const NoDataTableRow = ({ colsNumber }: NoDataTableRowProps) => {
    return (
        <Tr>
            <Td colSpan={colsNumber}>
                <Heading textAlign='center'>No data</Heading>
            </Td>
        </Tr>
    );
};
