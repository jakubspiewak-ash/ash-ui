import { useEffect } from 'react';

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
import { FieldValues, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/reducer/ExpenseSlice';
import { DateInputField } from '../common/form/fields/DateInputField';
import { InputField } from '../common/form/fields/InputField';
import { MoneyInputField } from '../common/form/fields/MoneyInputField';
import { SubmitButton } from '../common/form/SubmitButton';

export const ExpenseModalForm = () => {
    const { isOpen, mode } = useAppSelector((state) => state.expense.modal);

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(closeModal());

    const form = useForm<FieldValues>();

    const { handleSubmit, reset } = form;

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
                <ModalHeader>{mode === 'ADD' ? 'Add expense' : 'Edit expense'}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 4)))}>
                        <InputField
                          field={{
                                form,
                                label: 'Name',
                                name: 'name',
                            }}
                        />
                        <MoneyInputField
                          field={{
                                form,
                                label: 'Amount',
                                name: 'amount',
                            }}
                        />
                        <DateInputField
                          field={{
                                form,
                                label: 'Date',
                                name: 'date',
                            }}
                        />
                        <SubmitButton/>
                    </form>
                    Body
                </ModalBody>
                <ModalFooter>
                    <HStack>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};