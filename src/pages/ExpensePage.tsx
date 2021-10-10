import { Button, useDisclosure } from '@chakra-ui/react';
import { ExpenseTable } from '../components/expense/ExpenseTable';
import { ExpenseContextProvider } from '../providers/ExpenseContextProvider';
import { ExpenseForm } from '../components/expense/ExpenseForm';
import { ExpenseAddButton } from '../components/expense/ExpenseAddButton';

export const ExpensePage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <ExpenseContextProvider>
      <ExpenseTable onEdit={onOpen} />
      <ExpenseForm isOpen={isOpen} onClose={onClose} />
      <ExpenseAddButton onOpen={onOpen} />
    </ExpenseContextProvider>
  );
};
