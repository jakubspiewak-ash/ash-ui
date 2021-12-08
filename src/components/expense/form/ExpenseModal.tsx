import {
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeModal } from '../../../redux/reducer/ExpenseSlice';
import { ApiExpenseRequest } from '../../../services/api.types';
import { SubmitButton } from '../../common/form/SubmitButton';


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
    isPrivate: yup.boolean().required(),
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
    const { isOpen, mode } = useAppSelector((state) => state.expense.modal);
    const handleForm = useForm<ApiExpenseRequest>();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = handleForm;

    const dispatch = useAppDispatch();

    const onClose = () => dispatch(closeModal());

    const onSubmit = (data: ApiExpenseRequest) => new Promise((resolve) => {
        setTimeout(() => {
            alert(JSON.stringify(data, null, 2));
            resolve('x');
        }, 2000);
    });

    return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{mode === 'ADD' ? 'Add expense' : 'Edit expense'}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {/*<FormMoneyInput*/}
                        {/*  label={'Amount'}*/}
                        {/*  name={'amount'}*/}
                        {/*  registration={{*/}
                        {/*      currency: register('amount.currency'),*/}
                        {/*      gross: register('amount.gross'),*/}
                        {/*      net: register('amount.net'),*/}
                        {/*      vat: register('amount.vat'),*/}
                        {/*  }}*/}
                        {/*/>*/}
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <SubmitButton isLoading={isSubmitting}/>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
