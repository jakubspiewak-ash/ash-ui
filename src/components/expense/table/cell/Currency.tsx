import { Td } from "@chakra-ui/react";

import { ApiExpense } from "../../../../services/api.types";

export const Currency = ({ amount: { currency } }: ApiExpense) => {
    return (
        <Td>{currency}</Td>
    );
};