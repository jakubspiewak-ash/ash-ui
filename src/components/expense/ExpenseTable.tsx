import { useEffect } from 'react';

import { DeleteIcon, EditIcon, Icon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { MdAccountBalance, MdAccountCircle } from 'react-icons/md';
import { RiMailCheckLine } from 'react-icons/ri';

import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { ExpenseFormType, useExpenseContext } from '../../providers/ExpenseContextProvider';
import { ApiExpenseResponse } from "../../services/api.types";
import { deleteExpense } from '../../services/expense.service';

const ActionsCell = (expense: ApiExpenseResponse) => {
    const { updateExpenses, setRequested, modal: { onOpen } } = useExpenseContext();
    const { addErrorToast } = useErrorInfoContext();
    const { id } = expense;
    return (
        <Td>
            <HStack>
                <IconButton
                  aria-label='edit'
                  icon={<EditIcon/>}
                  size='sm'
                  onClick={() => {
                        setRequested({
                            id,
                            request: expense as ExpenseFormType,
                        });
                        onOpen();
                    }}
                />
                <IconButton
                  aria-label='delete'
                  colorScheme='red'
                  icon={<DeleteIcon/>}
                  size='sm'
                  onClick={() => deleteExpense(id).then(updateExpenses).catch(addErrorToast)}
                />
            </HStack>
        </Td>
    );
};

const NoDataRow = () => {
    return (
        <Tr>
            <Td colSpan={7}>
                <Heading textAlign='center'>No data</Heading>
            </Td>
        </Tr>
    );
};

const IsPrivateCell = ({ isPrivate }: { isPrivate: boolean }) => {
    return (
        <Td textAlign='center'>
            {
                isPrivate ?
                    <Icon
                      as={MdAccountCircle}
                      color={'yellow.500'}
                      h={6}
                      w={6}
                    /> :
                    <Icon
                      as={MdAccountBalance}
                      color={'blue.500'}
                      h={6}
                      w={6}
                    />
            }
        </Td>
    );
};

const ColumnNames = () => {
    return (
        <Tr>
            <Th>Name</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>VAT</Th>
            <Th textAlign='center'>Mail config</Th>
            <Th>Date</Th>
            <Th textAlign='center'>Is private</Th>
            <Th>Actions</Th>
        </Tr>
    );
};

export const ExpenseTable = () => {
    const { expenses, updateExpenses } = useExpenseContext();

    useEffect(() => {
        updateExpenses();
    }, []);

    return (
        <Table
          size='sm'
          variant='striped'
        >
            <TableCaption>Expenses data</TableCaption>
            <Thead>
                <ColumnNames/>
            </Thead>
            <Tbody>
                {expenses.length === 0 ? <NoDataRow/>
                    : expenses.map((expense, index) => {
                        const { name, amount: { net, gross, vat, currency }, date, mailConfig, isPrivate } = expense;
                        return (
                            <Tr key={index.toString()}>
                                <Td>{name}</Td>
                                <Td isNumeric>{`${net} / ${gross} ${currency}`}</Td>
                                <Td isNumeric>{`${vat}%`}</Td>
                                <Td textAlign='center'>{mailConfig ?
                                    <Icon
                                      as={RiMailCheckLine}
                                      color={'green.500'}
                                      h={6}
                                      w={6}
                                    /> :
                                    null
                                    // <Icon
                                    //   as={RiMailCloseLine}
                                    //   // color={'red.500'}
                                    //   color={'yellow.500'}
                                    //   h={6}
                                    //   w={6}
                                    // />
                                }
                                </Td>
                                <Td>{`${date?.start?.toLocaleDateString() || ''} - ${date?.end?.toLocaleDateString() || ''}`}</Td>
                                <IsPrivateCell isPrivate={isPrivate}/>
                                <ActionsCell {...expense}/>
                            </Tr>
                        );
                    })}
            </Tbody>
            <Tfoot>
                <ColumnNames/>
            </Tfoot>
        </Table>
    );
};