import { Button } from '@chakra-ui/react';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';

export const ExpenseAddButton = () => {
  const { setRequested, modal: {onOpen} } = useExpenseContext();
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