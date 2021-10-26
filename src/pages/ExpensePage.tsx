import {ExpenseTable} from '../components/expense/ExpenseTable';
import {ExpenseContextProvider} from '../providers/ExpenseContextProvider';
import {ExpenseModal} from '../components/expense/ExpenseModal';
import {ExpenseAddButton} from '../components/expense/ExpenseAddButton';
import {ExpenseRefreshButton} from "../components/expense/ExpenseRefreshButton";

export const ExpensePage = () => {

    return (
        <ExpenseContextProvider>
            <ExpenseTable/>
            <ExpenseModal/>
            <ExpenseAddButton/>
            <ExpenseRefreshButton/>
        </ExpenseContextProvider>
    );
};
