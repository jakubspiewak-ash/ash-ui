import { GridItem } from '@chakra-ui/react';

import { ExpenseGridItemProps } from './index';


export const Name = ({ expense: { name } }: ExpenseGridItemProps) => {
    return (
        <GridItem
          fontSize={24}
          lineHeight={1}
          pl={2}
        >
            {name}
        </GridItem>
    );
};