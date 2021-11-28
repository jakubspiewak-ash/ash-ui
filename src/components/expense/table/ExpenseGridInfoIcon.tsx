import React from 'react';

import { InfoIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface ExpenseGridInfoIconProps {
    onClick: () => void,
    marginLeft?: number | string
}

export const ExpenseGridInfoIcon = (props: ExpenseGridInfoIconProps) => {
    const { onClick, marginLeft } = props;
    return (
        <IconButton
          aria-label={'info-button'}
          icon={<InfoIcon/>}
          ml={marginLeft || 1}
          my={3}
          size={'sm'}
          // variant={"ghost"}
          onClick={onClick}
        />
    );
};