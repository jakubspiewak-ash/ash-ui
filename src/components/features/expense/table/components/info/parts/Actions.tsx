import { Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/all';

import { useAppDispatch } from '../../../../../../../redux/hooks';
import { deleteExpense, loadExpenses, openModal } from '../../../../../../../redux/reducer/ExpenseSlice';
import { DeleteAlert } from '../../../../../../common/alert/DeleteAlert';
import { HasExpense } from '../../types';

export const Actions = (props: HasExpense) => {
    const { expense } = props;
    const { id, name } = expense;

    const dispatch = useAppDispatch();

    const { isOpen, onClose, onOpen } = useDisclosure();

    const onDelete = () => dispatch(deleteExpense(id)).then(() => dispatch(loadExpenses()));
    const onEdit = () => dispatch(openModal(expense));

    return (
        <>
            <DeleteAlert
              isOpen={isOpen}
              message={`Do you want to delete <b>${name}</b> expense?`}
              onClose={onClose}
              onDelete={onDelete}
            />
            <SimpleGrid
              columns={2}
              mb={4}
              spacing={4}
            >
                <Button
                  leftIcon={<MdOutlineEdit/>}
                  variant={'outline'}
                  width={'full'}
                  onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                  colorScheme={'red'}
                  leftIcon={<MdOutlineDelete/>}
                  variant={'outline'}
                  width={'full'}
                  onClick={onOpen}
                >
                    Delete
                </Button>
            </SimpleGrid>
        </>
    );
};