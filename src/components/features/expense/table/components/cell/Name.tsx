import { Text } from '@chakra-ui/react';

import { TableData } from '../TableData';
import { TableCellProps } from '../types';

export const Name = (props: TableCellProps) => {
    const { expense: { name } } = props;
    return (
        <TableData>
            <Text fontSize={'2xl'}>
                {name}
            </Text>
        </TableData>
    );
};
