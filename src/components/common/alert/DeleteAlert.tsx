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

interface DeleteAlertProps {
    isOpen: boolean,
    onClose: () => void,
    onDelete: () => void,
    message: string,
}

export const DeleteAlert = (props: DeleteAlertProps) => {

    const { isOpen, onClose, onDelete, message } = props;

    const cancelRef = useRef<any>();

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
                        <div dangerouslySetInnerHTML={{ __html: message }}/>
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
                          onClick={() => onDelete()}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};