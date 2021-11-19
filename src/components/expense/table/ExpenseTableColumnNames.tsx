import { Th, Tr } from "@chakra-ui/react";

export const ColumnNames = () => {
    return (
        <Tr>
            <Th>Name</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>VAT</Th>
            <Th>Currency</Th>
            <Th textAlign={'center'}>Mail config</Th>
            <Th>Date</Th>
            <Th textAlign={'center'}>Is private</Th>
            <Th>Actions</Th>
        </Tr>
    );
};