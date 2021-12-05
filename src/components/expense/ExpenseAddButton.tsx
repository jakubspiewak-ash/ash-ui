import { Button } from '@chakra-ui/react';

import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/reducer/ExpenseSlice';


export const ExpenseAddButton = () => {
    const dispatch = useAppDispatch();
    const onClick = () => dispatch(openModal());
    return (
        <Button
          mr={2}
          onClick={onClick}
        >
            Add expense
        </Button>
    );
};