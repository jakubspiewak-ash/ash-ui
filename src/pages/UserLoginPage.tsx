import React from 'react';

import { FormHeading } from '../components/common/form/FormHeading';
import { UserLoginForm } from '../components/user/UserLoginForm';

export const UserLoginPage = () => {
    return (
        <>
            <FormHeading>
                Login!
            </FormHeading>
            <UserLoginForm/>
        </>
    );
};
