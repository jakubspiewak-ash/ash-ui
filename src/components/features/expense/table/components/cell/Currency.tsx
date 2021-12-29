import { SlideFade } from '@chakra-ui/react';

import { useAppSelector } from '../../../../../../redux/hooks';
import { useIsMdBreakpoint } from '../../../../../../utils/hooks';
import { TableData } from '../TableData';
import { TableCellProps } from '../types';

export const Currency = (props: TableCellProps) => {
    const { expense: { id, amount: { currency } } } = props;
    const { currentInfo } = useAppSelector((state) => state.expense.table);
    const md = useIsMdBreakpoint();
    return (
        <TableData hidden={!md}>
            <SlideFade in={currentInfo !== id}>
                {currency}
            </SlideFade>
        </TableData>
    );
};