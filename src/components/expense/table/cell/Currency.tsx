import { Box } from "@chakra-ui/react";

import { ExpenseGridItemProps } from "./index";

export const Currency = ({ expense }: ExpenseGridItemProps) => {
    const { amount: { currency } } = expense;
    return (
        <Box> {currency}</Box>
    );
};