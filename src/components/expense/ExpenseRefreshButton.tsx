import {Button} from "@chakra-ui/react";
import {useExpenseContext} from "../../providers/ExpenseContextProvider";

export const ExpenseRefreshButton = () => {
    const {updateExpenses} = useExpenseContext()
    return (
        <Button
            onClick={updateExpenses}
            mr={2}
        >
            Refresh
        </Button>
    )
}