import { useEffect } from 'react';

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useAppSelector } from '../../redux/hooks';
import { ReactComponent as Logo } from '../../resources/ash.svg';

import { LogoutButton } from './LogoutButton';
import { ThemeToggle } from './ThemeToggle';

export const ApplicationSettings = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const authenticated = useAppSelector((state) => state.auth.authenticated);

    useEffect(() => {
        if (!authenticated) {
            onClose();
        }
    }, [authenticated]);

    if (!authenticated) {
        return null;
    }

    return (
        <>
            <Button
              m={4}
              onClick={onOpen}
            >
                Application settings
            </Button>
            <Drawer
              isOpen={isOpen}
              placement={'left'}
              onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader><Box px={16}>
                        <Logo
                          style={{}}
                        />
                    </Box>
                        <Text>Ash</Text>
                    </DrawerHeader>
                    <DrawerBody>
                        <ThemeToggle/>
                        <LogoutButton/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};