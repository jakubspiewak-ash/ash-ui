import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {FormInput} from '../common/form/FormInput';
import {SubmitButton} from '../common/form/SubmitButton';
import {useExpenseContext} from '../../providers/ExpenseContextProvider';
import {useFormikContext} from 'formik';
import {ApiExpenseRequest} from '../../services/api.types';
import {FormMoneyInput} from "../common/form/FormMoneyInput";
import {FormSwitch} from "../common/form/FormSwitch";
import {DatePicker} from "../common/form/datepicker/DatePicker";

export const ExpenseModalForm = () => {
    const [initialized, setInitialized] = useState(false);
    const [isMailConfigEnabled, setIsMailConfigEnabled] = useState(false);

    const {updateExpenses, requested, setRequested, modal: {isOpen, onClose}} = useExpenseContext();

    const {setFieldValue, resetForm, values} = useFormikContext<ApiExpenseRequest>();

    useEffect(() => {
        setIsMailConfigEnabled(!!requested?.request.mailConfig);
    }, [requested]);

    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    useEffect(() => {
        if (!isMailConfigEnabled && initialized) setFieldValue('mailConfig', null);

        setInitialized(true);
    }, [isMailConfigEnabled]);

    useEffect(() => {
        if (values.isPrivate) {
            setFieldValue('mailConfig', null);
            setFieldValue('amount.vat', 0);
            setIsMailConfigEnabled(false);
        } else {
            setFieldValue('amount.vat', 23);
        }
    }, [values.isPrivate])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{requested ? 'Edit expense' : 'Add expense'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormInput field={'name'} label={'Name'}/>
                    <FormInput field={'date'} label={'Date'} type={"date"}/>
                    <DatePicker onChange={console.log} selectedDate={new Date()}/>
                    <FormSwitch field={'isPrivate'} label={'Is private'}/>
                    <FormMoneyInput field={'amount'} label={'Amount'}/>
                    <Accordion allowToggle index={isMailConfigEnabled ? 0 : -1}>
                        <AccordionItem>
                            <HStack>
                                <AccordionButton onClick={() => setIsMailConfigEnabled(!isMailConfigEnabled)}>
                                    <Text fontSize='xl'>Mail config</Text>
                                </AccordionButton>
                            </HStack>
                            <AccordionPanel>
                                <FormInput
                                    disabled={(!isMailConfigEnabled && initialized) || values.isPrivate}
                                    field='mailConfig.mailAddress'
                                    label='Mail address'
                                />
                                <FormInput
                                    disabled={(!isMailConfigEnabled && initialized) || values.isPrivate}
                                    field='mailConfig.attachmentPattern'
                                    label='Attachment Pattern'
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton afterSubmitting={() => {
                        // onClose();
                        // setRequested(undefined);
                        // updateExpenses();
                    }}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
