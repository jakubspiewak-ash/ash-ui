import React from "react";

import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { FormCard } from '../components/common/form/FormCard';
import { FormHeading } from '../components/common/form/FormHeading';
import { UserLoginForm } from '../components/user/UserLoginForm';

export const UserLoginPage = () => {
    const { push } = useHistory();
    return (
        <FormCard
          bellow={(
                <Button
                  mt={4}
                  width="full"

                  onClick={() => push('/register')}
                >
                    Register
                </Button>
            )}
        >
            <FormHeading>
                Login
            </FormHeading>
            <UserLoginForm/>
        </FormCard>
    );
};
