import { useEffect } from 'react';

import { DeleteIcon, EditIcon, EmailIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { useExpenseContext } from '../../providers/ExpenseContextProvider';
import { deleteExpense } from '../../services/expense.service';

export const ExpenseTable = () => {
  const { expenses, updateExpenses, setRequested, modal: { onOpen }, isLoadingExpenses } = useExpenseContext();
  const { addErrorToast } = useErrorInfoContext();


  useEffect(() => {
    updateExpenses();
  }, []);


  return (
    <Table
      size='sm'
      variant='striped'
      width='full'
    >
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
        {expenses.length === 0 ? (
            <Tr>
              <Td colSpan={4}>
                <Heading textAlign='center'>No data</Heading>
              </Td>
            </Tr>
          )
          : expenses.map(({
                            id,
                            name,
                            isPrivate,
                            amount: {
                              net,
                              gross,
                              vat,
                              currency,
                            },
                            mailConfig,
                            date: {
                              start,
                              end,
                            },
                          }, index) => (
            <Tr key={index.toString()}>
              <Td>{name}</Td>
              <Td isNumeric>{`${net}/${gross} PLN`}</Td>
              <Td textAlign='center'>{mailConfig ? <EmailIcon /> : <ViewOffIcon />}</Td>
              <Td>
                <HStack>
                  <IconButton
                    aria-label='edit'
                    icon={<EditIcon />}
                    size='sm'
                    onClick={() => {
                      setRequested({
                        id,
                        request: {
                          amount: {
                              currency,
                              gross,
                              net,
                              vat,
                            },
                          date: {
                            end,
                            start,
                          },
                          isPrivate,
                          mailConfig,
                          name,
                        },
                      });
                      onOpen();
                    }}
                  />
                  <IconButton
                    aria-label='delete'
                    colorScheme='red'
                    icon={<DeleteIcon />}
                    size='sm'
                    onClick={() => deleteExpense(id).then(updateExpenses).catch(addErrorToast)}
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
