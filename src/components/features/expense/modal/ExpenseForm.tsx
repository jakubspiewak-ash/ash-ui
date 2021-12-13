import { useEffect, useMemo, useState } from 'react';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';


import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { loadExpenses, saveExpense } from '../../../../redux/reducer/ExpenseSlice';
import { ApiExpenseRequest } from '../../../../services/api.types';
import { DateRangeField } from '../../../common/form/fields/DateRangeField';
import { MoneyField } from '../../../common/form/fields/MoneyField';
import { SwitchField } from '../../../common/form/fields/SwitchField';
import { TextField } from '../../../common/form/fields/TextField';

export const FORM_NAME = 'expense-form';

export interface ExpenseFormProps {
    form: UseFormReturn,
}

export const ExpenseForm = (props: ExpenseFormProps) => {
    const { form } = props;
    const { handleSubmit, watch, setValue } = form;

    const dispatch = useAppDispatch();
    const { month } = useAppSelector((state) => state.expense);

    const isPrivate: boolean = watch('isPrivate');
    const mailConfig = watch('mailConfig');

    const [isMailConfigEnabled, setMailConfigEnabled] = useState(false);

    const onMailConfigToggle = () => setMailConfigEnabled(!isMailConfigEnabled);
    const onSubmit = (request: ApiExpenseRequest) => dispatch(saveExpense(request)).then(() => dispatch(loadExpenses(month)));

    const isMailConfigEnabledIndex = useMemo(() => isMailConfigEnabled ? 0 : -1, [isMailConfigEnabled]);

    useEffect(() => {
        if (mailConfig) {
            onMailConfigToggle();
        }
    }, []);

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
        <form
          id={FORM_NAME}
          onSubmit={handleSubmit(onSubmit)}
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
                                name: 'mailConfig.mailAddress',
                            }}
                        />
                        <TextField
                          field={{
                                form,
                                label: 'Attachment',
                                name: 'mailConfig.attachmentPattern',
                            }}
                        />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </form>
    );
};