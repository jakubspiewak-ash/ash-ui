import React from 'react';

import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { IconButton, useDisclosure } from '@chakra-ui/react';

import { ExpenseDeleteAlert } from '../ExpenseDeleteAlert';


interface ExpenseToolsButtonProps {
    onInfo: () => void,
    onDelete: () => void,
    onEdit: () => void,
    name: string,
}

export const ExpenseToolsButtons = (props: ExpenseToolsButtonProps) => {
    const { onEdit, onInfo, onDelete, name } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

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
              onClick={onOpen}
            />
            <IconButton
              aria-label='info'
              icon={<InfoIcon/>}
              ml={2}
              my={3}
              size={'sm'}
              onClick={onInfo}
            />
            <ExpenseDeleteAlert
              isOpen={isOpen}
              name={name}
              onClose={onClose}
              onDelete={onDelete}
            />
        </>

    );
};