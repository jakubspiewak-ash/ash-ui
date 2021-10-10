import { Button } from '@chakra-ui/react';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';

interface AddExpenseButtonProps {
  onOpen: () => void;
}

export const ExpenseAddButton = ({ onOpen }: AddExpenseButtonProps) => {
  const { setRequested } = useExpenseContext();
  return (
    <Button
      mr={2}
      onClick={() => {
        setRequested(undefined);
        onOpen();
      }}
    >
      Add expense
    </Button>
  );
};