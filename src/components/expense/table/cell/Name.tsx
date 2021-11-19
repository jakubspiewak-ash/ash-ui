import { Td } from "@chakra-ui/react";

import { ApiExpense } from "../../../../services/api.types";

export const Name = ({ name }: ApiExpense) => {
    return (
        <Td fontSize={24}>{name}</Td>
    );
};