import {Formik} from 'formik';
import {useErrorInfoContext} from '../../providers/common/ErrorInfoContextProvider';
import {ExpenseFormType, useExpenseContext} from '../../providers/ExpenseContextProvider';
import {ExpenseForm} from './ExpenseForm';
import * as yup from "yup"

const emptyFormValue: ExpenseFormType = {
    name: '',
    amount: {
        net: undefined,
        gross: undefined,
        vat: 23,
        currency: 'PLN'
    },
    mailConfig: null,
    isPrivate: false,
    date: {
        start: undefined,
        end: undefined
    }
};

const validationSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .min(3, 'Name must have at least 3 characters')
        .max(64, 'Name must not exceed 50 characters'),
    date: yup.object({
        start: yup.date().optional(),
        end: yup.date()
            .optional()
            .when('start', {
                is: (start?: Date) => !!start,
                then: yup.date().min(yup.ref('start'), 'End date cannot be before start date')
            })
    }),
    amount: yup.object({
        net: yup.number()
            .required('Net is required')
            .positive('Net must be positive'),
        gross: yup.number()
            .required('Gross is required')
            .positive('Gross must be positive')
            .min(yup.ref('net'), 'Gross cannot be less than net value')
    }),
    mailConfig: yup.object({
        mailAddress: yup.string()
            .required('Mail address is required')
            .email('This is not valid email'),
        attachmentPattern: yup.string().required('Attachment pattern is required')
    }).nullable()
});

export const ExpenseModal = () => {
    const {addErrorToast} = useErrorInfoContext();
    const {requested, updateExpenses} = useExpenseContext();

    const onFormSubmit = (request: ExpenseFormType) => {
        console.log(request)
        // (requested?.id ? updateExpense(requested.id, request) : saveExpenses(request)).then(updateExpenses).catch(addErrorToast);
    };

    return (
        <Formik
            initialValues={requested?.request || emptyFormValue}
            onSubmit={onFormSubmit}
            enableReinitialize
            validationSchema={validationSchema}
        >
            <ExpenseForm/>
        </Formik>
    );
};
