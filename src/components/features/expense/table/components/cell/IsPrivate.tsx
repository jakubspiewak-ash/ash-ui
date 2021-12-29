import { SlideFade } from '@chakra-ui/react';
import { BiBuildings, BsPerson } from 'react-icons/all';

import { useAppSelector } from '../../../../../../redux/hooks';
import { useIsMdBreakpoint } from '../../../../../../utils/hooks';
import { TableData } from '../TableData';
import { TableCellProps } from '../types';

export const IsPrivate = (props: TableCellProps) => {
    const { expense: { id, isPrivate } } = props;
    const { currentInfo } = useAppSelector((state) => state.expense.table);
    const md = useIsMdBreakpoint();
    return (
        <TableData
          align={'center'}
          hidden={!md}
        >
            <SlideFade in={currentInfo !== id}>
                {isPrivate ? <BsPerson/> : <BiBuildings/>}
            </SlideFade>
        </TableData>
    );
};