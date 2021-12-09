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
import { DateField } from '../common/form/fields/DateField';
import { MoneyField } from '../common/form/fields/MoneyField';
import { SwitchField } from '../common/form/fields/SwitchField';
import { TextField } from '../common/form/fields/TextField';
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
                        <TextField
                          field={{
                                form,
                                label: 'Name',
                                name: 'name',
                            }}
                        />
                        <MoneyField
                          field={{
                                form,
                                label: 'Amount',
                                name: 'amount',
                            }}
                        />
                        <DateField
                          field={{
                                form,
                                label: 'Date',
                                name: 'date',
                            }}
                        />
                        <SwitchField
                          field={{
                                form,
                                label: 'Is private',
                                name: 'isPrivate',
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