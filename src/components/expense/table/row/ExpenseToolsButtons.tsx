import React from 'react';

import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';


interface ExpenseToolsButtonProps {
    onInfo: () => void,
    onDelete: () => void,
    onEdit: () => void,
}

export const ExpenseToolsButtons = (props: ExpenseToolsButtonProps) => {
    const { onEdit, onInfo, onDelete } = props;
    return (
        <>
            <IconButton
              aria-label='edit'
              icon={<EditIcon/>}
              ml={'auto'}
              my={3}
              size={'sm'}
              onClick={onEdit}
            />
            <IconButton
              aria-label='delete'
              colorScheme='red'
              icon={<DeleteIcon/>}
              ml={2}
              my={3}
              size={'sm'}
              onClick={onDelete}
            />
            <IconButton
              aria-label='info'
              icon={<InfoIcon/>}
              ml={2}
              my={3}
              size={'sm'}
              onClick={onInfo}
            />
        </>

    );
};