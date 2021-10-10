import {
  Heading, HStack, IconButton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr,
} from '@chakra-ui/react';
import {
  DeleteIcon, EditIcon, EmailIcon, ViewOffIcon,
} from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';
import { deleteExpense } from '../../services/expense.service';
import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';

interface ExpenseTableProps {
  onEdit: (id: string) => void;
}

export const ExpenseTable = ({ onEdit }: ExpenseTableProps) => {
  const { expenses, updateExpenses, setRequested } = useExpenseContext();
  const { addErrorToast } = useErrorInfoContext();

  useEffect(() => {
    updateExpenses();
  }, []);

  return (
    <Table variant='striped' width='full' size='sm'>
      <TableCaption>Expenses data</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Amount</Th>
          <Th>Mail config</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.length === 0
          ? (
            <Tr>
              <Td colSpan={4}>
                <Heading textAlign='center'>No data</Heading>
              </Td>
            </Tr>
          )
          : expenses.map(({
                            id, name, amount, mailConfig,
                          }, index) => (
            <Tr key={index.toString()}>
              <Td>{name}</Td>
              <Td isNumeric>{`${amount} PLN`}</Td>
              <Td textAlign='center'>{mailConfig ? <EmailIcon /> : <ViewOffIcon />}</Td>
              <Td>
                <HStack>
                  <IconButton
                    size='sm'
                    icon={<EditIcon />}
                    onClick={() => {
                      setRequested({
                        id,
                        request: {
                          name, amount, mailConfig,
                        },
                      });
                      onEdit(id);
                    }}
                    aria-label='delete'
                  />
                  <IconButton
                    size='sm'
                    icon={<DeleteIcon />}
                    onClick={() => deleteExpense(id).then(updateExpenses).catch(addErrorToast)}
                    aria-label='delete'
                    colorScheme='red'
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Amount</Th>
          <Th>Mail config</Th>
          <Th>Actions</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};
