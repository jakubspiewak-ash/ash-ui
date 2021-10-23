import {ExpenseTable} from '../components/expense/ExpenseTable';
import {ExpenseContextProvider} from '../providers/ExpenseContextProvider';
import {ExpenseForm} from '../components/expense/ExpenseForm';
import {ExpenseAddButton} from '../components/expense/ExpenseAddButton';
import {ExpenseRefreshButton} from "../components/expense/ExpenseRefreshButton";

export const ExpensePage = () => {

    return (
        <ExpenseContextProvider>
            <ExpenseTable/>
            <ExpenseForm/>
            <ExpenseAddButton/>
            <ExpenseRefreshButton/>
        </ExpenseContextProvider>
    );
};
