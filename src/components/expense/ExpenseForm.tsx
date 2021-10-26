import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
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
import {FormDateRangeInput} from "../common/form/FormDateRangeInput";

export const ExpenseForm = () => {
    const [initialized, setInitialized] = useState(false);
    const [isMailConfigEnabled, setIsMailConfigEnabled] = useState(false);

    const {updateExpenses, requested, setRequested, modal: {isOpen, onClose}} = useExpenseContext();

    const {setFieldValue, resetForm, values, errors, setErrors} = useFormikContext<ApiExpenseRequest>();

    useEffect(() => {
        setIsMailConfigEnabled(!!requested?.request.mailConfig);
    }, [requested]);

    useEffect(() => {
        if (!isOpen) {
            resetForm();
            setErrors({});
            setIsMailConfigEnabled(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isMailConfigEnabled && initialized) setFieldValue('mailConfig', null);
        else if (isMailConfigEnabled && initialized) {
            setFieldValue('mailConfig', {
                mailAddress: '',
                attachmentPattern: ''
            }, false);
        }
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
    }, [values.isPrivate]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    {requested ? 'Edit expense' : 'Add expense'}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormInput
                        field={'name'}
                        label={'Name'}
                    />
                    <FormDateRangeInput
                        field={'date'}
                        label={'Date'}
                    />
                    <FormMoneyInput
                        field={'amount'}
                        label={'Amount'}
                        isDisabledVat={values.isPrivate}
                    />
                    <FormSwitch
                        field={'isPrivate'}
                        label={'Is private'}
                    />
                    <Accordion
                        index={isMailConfigEnabled ? 0 : -1}
                        allowToggle
                    >
                        <AccordionItem isDisabled={values.isPrivate}>
                            <h2>
                                <AccordionButton
                                    onClick={() => !values.isPrivate && setIsMailConfigEnabled(!isMailConfigEnabled)}
                                >
                                    <Text
                                        flex={1}
                                        fontSize='xl'
                                    >
                                        Mail config
                                    </Text>
                                    <AccordionIcon/>
                                </AccordionButton>
                            </h2>
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
