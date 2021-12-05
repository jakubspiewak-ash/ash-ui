import { Formik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginAction } from '../../redux/reducer/AuthSlice';
import { ApiUserCredentials } from '../../services/api.types';
import { FormInput } from '../common/form/FormInput';
import { SubmitButton } from '../common/form/SubmitButton';

const emptyForm: ApiUserCredentials = {
    login: '',
    password: '',
};

export const UserLoginForm = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);
    return (
        <Formik
          initialValues={emptyForm}
          enableReinitialize
          onSubmit={(user) => {
                dispatch(loginAction(user));
            }}
        >
            <>
                <FormInput
                  field="login"
                  label="Login"
                />
                <FormInput
                  field="password"
                  label="Password"
                  type="password"
                />
                <SubmitButton  
                  isLoading={authStatus === 'LOADING'}
                >
                    Sign in
                </SubmitButton>
            </>
        </Formik>
    );
};
