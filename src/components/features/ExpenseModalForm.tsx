import { useEffect, useMemo, useState } from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
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
import { DateRangeField } from '../common/form/fields/DateRangeField';
import { MoneyField } from '../common/form/fields/MoneyField';
import { SwitchField } from '../common/form/fields/SwitchField';
import { TextField } from '../common/form/fields/TextField';
import { SubmitButton } from '../common/form/SubmitButton';

export const ExpenseModalForm = () => {
    const { isOpen, mode } = useAppSelector((state: RootState) => state.expense.modal);

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(closeModal());

    const [isMailConfigEnabled, setMailConfigEnabled] = useState(false);

    const form = useForm<FieldValues>();
    const { handleSubmit, reset, watch, setValue } = form;
    const isPrivate: boolean = watch('isPrivate');

    const onMailConfigToggle = () => setMailConfigEnabled(!isMailConfigEnabled);

    const isMailConfigEnabledIndex = useMemo(() => isMailConfigEnabled ? 0 : -1, [isMailConfigEnabled]);
    const header = useMemo(() => mode === 'ADD' ? 'Add expense' : 'Edit expense', [mode]);

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isPrivate) {
            setMailConfigEnabled(false);
            setValue('mailConfig', null);
        }
    }, [isPrivate]);

    useEffect(() => {
        if (isMailConfigEnabled) {
            setValue('mailConfig.attachment', '');
            setValue('mailConfig.address', '');
        } else {
            setValue('mailConfig', null);
        }
    }, [isMailConfigEnabled]);

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
                    <form
                      id={'expense-form'}
                      onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 4)))}
                    >
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
                        <DateRangeField
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
                        <Accordion
                          index={isMailConfigEnabledIndex}
                          allowToggle
                        >
                            <AccordionItem isDisabled={isPrivate}>
                                <AccordionButton onClick={onMailConfigToggle}>
                                    <Box
                                      flex={1}
                                      textAlign={'left'}
                                    >
                                        Mail config
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                                <AccordionPanel>
                                    <TextField
                                      field={{
                                            form,
                                            label: 'Address',
                                            name: 'mailConfig.address',
                                        }}
                                    />
                                    <TextField
                                      field={{
                                            form,
                                            label: 'Attachment',
                                            name: 'mailConfig.attachment',
                                        }}
                                    />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton form={'expense-form'}/>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};