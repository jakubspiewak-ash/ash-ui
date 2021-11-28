import React from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

import { ExpenseGridInfoIcon } from './ExpenseGridInfoIcon';

interface ExpenseToolsButtonProps {
    onInfo: () => void,
    onDelete: () => void,
    onEdit: () => void,
}

export const ExpenseToolsButtons = (props: ExpenseToolsButtonProps) => {
    const { onEdit, onInfo, onDelete } = props;
    return (
        <Box ml={'auto'}>
            <IconButton
              aria-label='edit'
              icon={<EditIcon/>}
              my={3}
              size={'sm'}
              onClick={onEdit}
            />
            <IconButton
              aria-label='delete'
              colorScheme='red'
              icon={<DeleteIcon/>}
              ml={1}
              my={3}
              size={'sm'}
              onClick={onDelete}
            />
            <ExpenseGridInfoIcon onClick={onInfo}/>
        </Box>

    );
};