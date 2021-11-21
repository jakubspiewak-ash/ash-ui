import { useMemo } from "react";

import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { Box, Collapse, GridItem, HStack, IconButton, Text } from "@chakra-ui/react";


import { useErrorInfoContext } from "../../../providers/common/ErrorInfoContextProvider";
import { ExpenseFormType, useExpenseContext } from "../../../providers/ExpenseContextProvider";
import { ApiExpense } from "../../../services/api.types";
import { deleteExpense } from "../../../services/expense.service";
import { useIsMdBreakpoint } from "../../../utils/hooks";
import { numberWithSpaces } from "../summary/CurrencySummary";

import * as Cell from "./cell";
import { ExpenseGridCell } from "./ExpenseGridCell";

interface ExpenseTableRowProps {
    expense: ApiExpense,
    info: {
        currentInfoId?: string,
        onClick: (id: string) => void
    }
}

export const NAME_CELL_SIZE = 4;
export const AMOUNT_CELL_SIZE = 2;
export const CURRENCY_CELL_SIZE = 1;
export const DATE_CELL_SIZE = 2;
export const IS_PRIVATE_CELL_SIZE = 1;
export const INFO_CELL_SIZE = 1;

export const ROW_SIZE = NAME_CELL_SIZE + AMOUNT_CELL_SIZE + CURRENCY_CELL_SIZE + DATE_CELL_SIZE + IS_PRIVATE_CELL_SIZE;

export const ExpenseGridRow = ({ expense, info }: ExpenseTableRowProps) => {
    const { id } = expense;
    const { updateData, setRequested, data, modal: { onOpen } } = useExpenseContext();
    const { addErrorToast } = useErrorInfoContext();

    const isMd = useIsMdBreakpoint();

    const onEditClick = () => {
        setRequested({
            id,
            request: expense as ExpenseFormType,
        });
        onOpen();
    };
    const onDeleteClick = () => deleteExpense(id)
        // todo: change that xd to update with current month/year
        .then(() => updateData({ month: new Date().getMonth() + 1, year: new Date().getFullYear() }))
        .catch(addErrorToast);

    const onInfoClick = () => info.onClick(id);

    const infoVisible = useMemo(() => id === info.currentInfoId, [info.currentInfoId]);
    const bottomBorder = useMemo(() => id === data.expenses[data.expenses.length - 1]?.id ? 0 : 1, []);
    const columnsNum = useMemo(() => isMd ? ROW_SIZE + 1 : NAME_CELL_SIZE + 1, [isMd]);
    const ColumnsMd = useMemo(() => {
        return !isMd ? null
            : (
                <>
                    <ExpenseGridCell
                      align={'end'}
                      hidden={infoVisible}
                      size={AMOUNT_CELL_SIZE}
                    >
                        {numberWithSpaces(expense.amount.gross)}
                    </ExpenseGridCell>
                    <ExpenseGridCell
                      hidden={infoVisible}
                      size={CURRENCY_CELL_SIZE}
                    >
                        {expense.amount.currency}
                    </ExpenseGridCell>
                    <ExpenseGridCell
                      align={'center'}
                      hidden={infoVisible}
                      size={IS_PRIVATE_CELL_SIZE}
                    >
                        <Cell.IsPrivate expense={expense}/>
                    </ExpenseGridCell>
                    <ExpenseGridCell
                      hidden={infoVisible}
                      size={DATE_CELL_SIZE}
                    >
                        <Cell.Date expense={expense}/>
                    </ExpenseGridCell>
                </>
            );
    }, [isMd, infoVisible]);

    return (
        <>
            <ExpenseGridCell size={NAME_CELL_SIZE}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            {ColumnsMd}
            <GridItem
              colSpan={INFO_CELL_SIZE}
              p={4}
            >
                <IconButton
                  aria-label={'info-button'}
                  variant={"ghost"}
                  onClick={onInfoClick}
                >
                    <InfoIcon/>
                </IconButton>
            </GridItem>
            <GridItem
              borderBottomWidth={bottomBorder}
              colSpan={columnsNum}
              justifyContent={'center'}
            >
                <Collapse
                  in={infoVisible}
                  animateOpacity
                >
                    <Box
                      colSpan={5}
                      px={4}
                    >
                        <HStack py={4}>
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
                        <Text>{expense.amount.gross}</Text>
                        <Text>{expense.amount.net}</Text>
                        <Text>{expense.amount.vat}</Text>
                    </Box>
                </Collapse>
            </GridItem>
        </>
    );
};