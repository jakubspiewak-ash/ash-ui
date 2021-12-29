import { IconButton } from '@chakra-ui/react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/all';

import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { toggleInfo } from '../../../../../../redux/reducer/ExpenseSlice';
import { TableData } from '../TableData';
import { TableCellProps } from '../types';

export const Info = (props: TableCellProps) => {
    const { expense: { id } } = props;
    const dispatch = useAppDispatch();
    const { currentInfo } = useAppSelector((state) => state.expense.table);

    const onClick = () => dispatch(toggleInfo(id));

    return (
        <TableData align={'center'}>
            <IconButton
              aria-label={'info'}
              variant={'ghost'}
              onClick={onClick}
            >
                {currentInfo !== id ? <HiOutlineEye/> : <HiOutlineEyeOff/>}
            </IconButton>
        </TableData>
    );
};