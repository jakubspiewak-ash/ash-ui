import { Formik } from 'formik';
import { saveExpenses, updateExpense } from '../../services/expense.service';
import { ApiExpenseRequest } from '../../services/api.types';
import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';
import { ExpenseModalForm } from './ExpenseModalForm';


const emptyFormValue: ApiExpenseRequest = {
        name: '',
        amount: {
            net: 0,
            gross: 0,
            vat: 23,
            currency: 'PLN'
        },
        mailConfig: null,
        isPrivate: false
    }
;

export const ExpenseForm = () => {
  const { addErrorToast } = useErrorInfoContext();
  const { requested, updateExpenses } = useExpenseContext();

  const onFormSubmit = (request: ApiExpenseRequest) => {
        console.log(request)
      // (requested?.id ? updateExpense(requested.id, request) : saveExpenses(request)).then(updateExpenses).catch(addErrorToast);
  };

  return (
    <Formik
      initialValues={requested?.request || emptyFormValue}
      onSubmit={onFormSubmit}
      enableReinitialize
    >
      <ExpenseModalForm />
    </Formik>
  );
};
