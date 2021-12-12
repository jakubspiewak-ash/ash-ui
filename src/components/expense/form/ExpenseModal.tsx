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

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeModal } from '../../../redux/reducer/ExpenseSlice';
import { ApiExpenseRequest } from '../../../services/api.types';
import { SubmitButton } from '../../common/form/SubmitButton';


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
