import { Formik } from 'formik';
import * as yup from "yup";

import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { ExpenseFormType, useExpenseContext } from '../../providers/ExpenseContextProvider';

import { ExpenseForm } from './ExpenseForm';

const emptyFormValue: ExpenseFormType = {
    amount: {
        currency: 'PLN',
        gross: undefined,
        net: undefined,
        vat: 23,
    },
    date: {
        end: undefined,
        start: undefined,
    },
    isPrivate: false,
    mailConfig: null,
    name: '',
};

const validationSchema = yup.object({
    amount: yup.object({
        gross: yup.number()
            .required('Gross is required')
            .positive('Gross must be positive')
            .min(yup.ref('net'), 'Gross cannot be less than net value'),
        net: yup.number()
            .required('Net is required')
            .positive('Net must be positive'),
    }),
    date: yup.object({
        end: yup.date()
            .optional()
            .when('start', {
                is: (start?: Date) => !!start,
                then: yup.date().min(yup.ref('start'), 'End date cannot be before start date'),
            }),
        start: yup.date().optional(),
    }),
    mailConfig: yup.object({
        attachmentPattern: yup.string().required('Attachment pattern is required'),
        mailAddress: yup.string()
            .required('Mail address is required')
            .email('This is not valid email'),
    }).nullable(),
    name: yup.string()
        .required('Name is required')
        .min(3, 'Name must have at least 3 characters')
        .max(64, 'Name must not exceed 50 characters'),
});

export const ExpenseModal = () => {
    const { addErrorToast } = useErrorInfoContext();
    const { requested, updateExpenses } = useExpenseContext();

    const onFormSubmit = (request: ExpenseFormType) => {
        // eslint-disable-next-line no-console
        console.log(request);
        // (requested?.id ? updateExpense(requested.id, request) : saveExpenses(request)).then(updateExpenses).catch(addErrorToast);
    };

    return (
        <Formik
          initialValues={requested?.request || emptyFormValue}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onFormSubmit}
        >
            <ExpenseForm/>
        </Formik>
    );
};
