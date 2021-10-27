import { Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { FormCard } from '../components/common/form/FormCard';
import { FormHeading } from '../components/common/form/FormHeading';
import { UserRegistrationForm } from '../components/user/UserRegistrationForm';

export const UserRegistrationPage = () => {
    const { push } = useHistory();
    return (
        <FormCard
          bellow={(
                <Button
                  mt={4}
                  width="full"
                  onClick={() => push('/login')}
                >
                    Log in
                </Button>
            )}
        >
            <FormHeading>Register</FormHeading>
            <UserRegistrationForm/>
        </FormCard>
    );
};
