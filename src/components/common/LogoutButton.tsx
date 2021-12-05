import { Button } from '@chakra-ui/react';

import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/reducer/AuthSlice';

export const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const onClick = () => dispatch(logout());
    return (
        <Button
          my={4}
          onClick={onClick}
        >
            Logout
        </Button>
    );
};