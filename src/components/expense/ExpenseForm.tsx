import { Formik } from 'formik';
import { saveExpenses, updateExpense } from '../../services/expense.service';
import { ApiExpenseRequest } from '../../services/api.types';
import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';
import { ExpenseModalForm } from './ExpenseModalForm';

export interface ExpenseFormProps {
  isOpen: boolean,
  onClose: () => void;
}

const emptyFormValue: ApiExpenseRequest = {
    name: '',
    amount: 0,
    mailConfig: null
  }
;

export const ExpenseForm = (props: ExpenseFormProps) => {
  const { addErrorToast } = useErrorInfoContext();
  const { requested } = useExpenseContext();

  const onFormSubmit = (request: ApiExpenseRequest) => {
    (requested?.id ? updateExpense(requested.id, request) : saveExpenses(request)).catch(addErrorToast);
  };

  return (
    <Formik
      initialValues={requested?.request || emptyFormValue}
      onSubmit={onFormSubmit}
      enableReinitialize
    >
      <ExpenseModalForm {...props} />
    </Formik>
  );
};
