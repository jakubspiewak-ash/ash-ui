import { Button } from "@chakra-ui/react";

import { useExpenseContext } from "../../providers/ExpenseContextProvider";

export const ExpenseRefreshButton = () => {
    const { updateExpenses } = useExpenseContext();
    return (
        <Button
          mr={2}
          onClick={updateExpenses}
        >
            Refresh
        </Button>
    );
};