import { Tr } from "@chakra-ui/react";

import { ApiExpense } from "../../../services/api.types";

import * as Cell from "./cell";

export const ExpenseTableRow = (expense: ApiExpense) => {
    return (
        <Tr key={expense.id}>
            <Cell.Name {...expense}/>
            <Cell.Amount {...expense}/>
            <Cell.Vat {...expense}/>
            <Cell.Currency {...expense}/>
            <Cell.MailConfig {...expense}/>
            <Cell.Date {...expense}/>
            <Cell.IsPrivate {...expense}/>
            <Cell.Actions {...expense}/>
        </Tr>
    );
};