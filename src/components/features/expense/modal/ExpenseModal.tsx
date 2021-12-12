import { useEffect, useMemo } from 'react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { closeModal } from '../../../../redux/reducer/ExpenseSlice';
import { RootState } from '../../../../redux/types';
import { SubmitButton } from '../../../common/form/SubmitButton';

import { ExpenseForm, FORM_NAME } from './ExpenseForm';

const validationSchema = yup.object({
    amount: yup.object({
        gross: yup.number()
            .typeError('Gross is required')
            .required('Gross is required')
            .positive('Gross must be positive')
            .min(yup.ref('net'), 'Gross cannot be less than net value'),
        net: yup.number()
            .typeError('Net is required')
            .required('Net is required')
            .positive('Net must be positive'),
    }),
    date: yup.object({
        end: yup.date()
            .nullable()
            .when('start', {
                is: (start?: Date) => !!start,
                then: yup.date().min(yup.ref('start'), 'End date cannot be before start date'),
            }),
        start: yup.date().nullable(),
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
    const { isOpen, mode, initialFormValue } = useAppSelector((state: RootState) => state.expense.modal);

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(closeModal());

    const form = useForm<FieldValues>({
        resolver: yupResolver(validationSchema),
    });
    const { reset } = form;
    const header = useMemo(() => mode === 'ADD' ? 'Add expense' : 'Edit expense', [mode]);

    useEffect(() => {
        if (isOpen) {
            reset(initialFormValue);
            // eslint-disable-next-line no-console
            console.log(initialFormValue);
        }
    }, [isOpen]);

    return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody>
                    <ExpenseForm form={form}/>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton formName={FORM_NAME}/>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};