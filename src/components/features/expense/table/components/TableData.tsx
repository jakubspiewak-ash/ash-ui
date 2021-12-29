import { Td } from '@chakra-ui/react';

import { HasChildren } from '../../../../common/common.types';

interface TableDataProps extends HasChildren {
    align?: 'center' | 'start' | 'end'
    size?: number,
    hidden?: boolean,
    padding?: number,
}

export const TableData = (props: TableDataProps) => {
    const { children, size, align, padding, hidden } = props;

    return (
        <Td
          colSpan={size}
          hidden={hidden}
          padding={padding}
          textAlign={align}
        >
            {children}
        </Td>
    );
};