import { useHistory } from 'react-router-dom';

import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';
import { ApiUserCredentials } from '../../services/api.types';
import { saveUser } from '../../services/user.service';
import { SubmitButton } from '../common/form/SubmitButton';

const initialFormValue: ApiUserCredentials = {
    login: '',
    password: '',
};

export const UserRegistrationForm = () => {
    const { push } = useHistory();
    const { addErrorToast } = useErrorInfoContext();

    const onSubmit = (user: ApiUserCredentials) => saveUser(user)
        .then(() => push('/login'))
        .catch(addErrorToast);

    return (
        <>
            {/*<FormInput*/}
            {/*  field="login"*/}
            {/*  label="Login"*/}
            {/*/>*/}
            {/*<FormInput*/}
            {/*  field="password"*/}
            {/*  label="Password"*/}
            {/*  type="password"*/}
            {/*/>*/}
            <SubmitButton/>
        </>
    );
};
