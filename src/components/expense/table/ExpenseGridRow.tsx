import React, { useMemo } from "react";

import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { Collapse, GridItem, IconButton } from "@chakra-ui/react";

import { useErrorInfoContext } from "../../../providers/common/ErrorInfoContextProvider";
import { ExpenseFormType, useExpenseContext } from "../../../providers/ExpenseContextProvider";
import { ApiExpense } from "../../../services/api.types";
import { deleteExpense } from "../../../services/expense.service";
import { useIsMdBreakpoint } from "../../../utils/hooks";
import { formatNumber } from "../summary/CurrencySummary";

import * as Cell from "./cell";
import { ExpenseGridCell } from "./ExpenseGridCell";
import { ExpenseInfo } from "./ExpenseInfo";

interface ExpenseTableRowProps {
    expense: ApiExpense,
    info: {
        currentInfoId?: string,
        onClick: (id: string) => void
    }
}

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
    const bottomBorder = useMemo(() => id === data.expenses[data.expenses.length - 1]?.id ? 0 : 1, [data.expenses]);
    const nameColumnSize = useMemo(() => isMd ? (infoVisible ? 8 : 5) : (infoVisible ? 8 : 11), [isMd, infoVisible]);

    const RestColumns = useMemo(() => {
        return isMd ? (
            <>
                <ExpenseGridCell
                  align={'end'}
                  size={2}
                >
                    {formatNumber(expense.amount.gross)}
                </ExpenseGridCell>
                <ExpenseGridCell
                  size={1}
                >
                    {expense.amount.currency}
                </ExpenseGridCell>
                <ExpenseGridCell
                  align={'center'}
                  size={1}
                >
                    <Cell.IsPrivate expense={expense}/>
                </ExpenseGridCell>
                <ExpenseGridCell
                  size={2}
                >
                    <Cell.Date expense={expense}/>
                </ExpenseGridCell>
            </>
        ) : null;
    }, [isMd]);

    const InfoColumns = (
        <ExpenseGridCell
          align={'end'}
          size={3}
        >
            <IconButton
              aria-label='edit'
              icon={<EditIcon/>}
              ml={2}
              size={'sm'}
              onClick={onEditClick}
            />
            <IconButton
              aria-label='delete'
              colorScheme='red'
              icon={<DeleteIcon/>}
              ml={2}
              size={"sm"}
              onClick={onDeleteClick}
            />
        </ExpenseGridCell>
    );
    return (
        <>
            <ExpenseGridCell size={nameColumnSize}>
                <Cell.Name expense={expense}/>
            </ExpenseGridCell>
            {infoVisible ? InfoColumns : RestColumns}
            <ExpenseGridCell align={'end'}>
                <IconButton
                  aria-label={'info-button'}
                  ml={2}
                  my={4}
                  variant={"ghost"}
                  onClick={onInfoClick}
                >
                    <InfoIcon/>
                </IconButton>
            </ExpenseGridCell>
            <GridItem
              borderBottomWidth={bottomBorder}
              colSpan={12}
              justifyContent={'center'}
            >
                <Collapse
                  in={infoVisible}
                  animateOpacity
                >
                    <ExpenseInfo expense={expense}/>
                </Collapse>
            </GridItem>
        </>
    );
};