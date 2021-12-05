import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeModal } from '../../../redux/reducer/ExpenseSlice';


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
    const dispatch = useAppDispatch();

    const onClose = () => dispatch(closeModal());

    return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{mode === 'ADD' ? 'Add expense' : 'Edit expense'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    Test
                    Test
                    Test
                    Test
                    Test
                    Test
                    Test
                </ModalBody>
                <ModalFooter>
                    <Button>Cancel</Button>
                    <Button>Add</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
