import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Td } from "@chakra-ui/react";

import { useErrorInfoContext } from "../../../../providers/common/ErrorInfoContextProvider";
import { ExpenseFormType, useExpenseContext } from "../../../../providers/ExpenseContextProvider";
import { ApiExpense } from "../../../../services/api.types";
import { deleteExpense } from "../../../../services/expense.service";

export const Actions = (expense: ApiExpense) => {
    const { updateData, setRequested, modal: { onOpen } } = useExpenseContext();
    const { addErrorToast } = useErrorInfoContext();
    const { id } = expense;

    const onEditClick = () => {
        setRequested({
            id,
            request: expense as ExpenseFormType,
        });
        onOpen();
    };

    const onDeleteClick = () => deleteExpense(id)
        // todo: change that xd
        .then(() => updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() }))
        .catch(addErrorToast);

    return (
        <Td>
            <HStack>
                <IconButton
                  aria-label='edit'
                  icon={<EditIcon/>}
                  size='sm'
                  onClick={onEditClick}
                />
                <IconButton
                  aria-label='delete'
                  colorScheme='red'
                  icon={<DeleteIcon/>}
                  size='sm'
                  onClick={onDeleteClick}
                />
            </HStack>
        </Td>
    );
};