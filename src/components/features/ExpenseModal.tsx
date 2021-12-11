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
import { FieldValues, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/reducer/ExpenseSlice';
import { RootState } from '../../redux/types';
import { SubmitButton } from '../common/form/SubmitButton';

import { ExpenseForm, FORM_NAME } from './ExpenseForm';

export const ExpenseModal = () => {
    const { isOpen, mode } = useAppSelector((state: RootState) => state.expense.modal);

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(closeModal());

    const form = useForm<FieldValues>();
    const { reset } = form;
    const header = useMemo(() => mode === 'ADD' ? 'Add expense' : 'Edit expense', [mode]);

    useEffect(() => {
        if (!isOpen) {
            reset();
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