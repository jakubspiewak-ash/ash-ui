import {
  Checkbox,
  Divider,
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
import { useEffect, useState } from 'react';
import { FormInput } from '../common/form/FormInput';
import { FormNumberInput } from '../common/form/FormNumberInput';
import { SubmitButton } from '../common/form/SubmitButton';
import { ExpenseFormProps } from './ExpenseForm';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';
import { useFormikContext } from 'formik';
import { ApiExpenseRequest } from '../../services/api.types';

export interface ExpenseModalFormProps extends ExpenseFormProps {
}

export const ExpenseModalForm = ({ isOpen, onClose }: ExpenseModalFormProps) => {
  const [initialized, setInitialized] = useState(false);
  const [isMailConfigEnabled, setIsMailConfigEnabled] = useState(false);
  const { updateExpenses, requested, setRequested } = useExpenseContext();

  const { setFieldValue, resetForm } = useFormikContext<ApiExpenseRequest>();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{requested ? 'Edit expense' : 'Add expense'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormInput name='name' label='Name' />
          <FormNumberInput name='amount' label='Amount' />
          <Divider my={4} />
          <HStack>
            <Checkbox
              isChecked={isMailConfigEnabled}
              onChange={({ target: { checked } }) => setIsMailConfigEnabled(checked)}
            />
            <Text fontSize='2xl'>Mail config</Text>
          </HStack>
          <FormInput
            disabled={!isMailConfigEnabled && initialized}
            name='mailConfig.mailAddress'
            label='Mail address'
          />
          <FormInput
            disabled={!isMailConfigEnabled && initialized}
            name='mailConfig.attachmentPattern'
            label='Attachment Pattern'
          />
        </ModalBody>
        <ModalFooter>
          <SubmitButton afterSubmitting={() => {
            onClose();
            setRequested(undefined);
            updateExpenses();
          }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
