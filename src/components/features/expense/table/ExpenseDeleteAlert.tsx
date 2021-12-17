import { useRef } from 'react';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';

interface ExpenseDeleteAlertProps {
    isOpen: boolean,
    onClose: () => void,
    onDelete: () => void,
    name: string
}

export const ExpenseDeleteAlert = (props: ExpenseDeleteAlertProps) => {
    const { onClose, isOpen, name, onDelete } = props;

    const cancelRef = useRef<any>();
    const onDeleteClick = () => {
        onDelete();
        onClose();
    };

    return (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          isCentered
          onClose={() => onClose()}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you sure?
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Do you want to delete <b>{name}</b> expense?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => onClose()}
                        >
                            Close
                        </Button>
                        <Button
                          colorScheme={'red'}
                          ml={3}
                          onClick={() => onDeleteClick()}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};