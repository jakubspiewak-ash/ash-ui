import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/reducer/AuthSlice';
import { ApiUserCredentials } from '../../services/api.types';
import { TextField } from '../common/form/fields/TextField';
import { SubmitButton } from '../common/form/SubmitButton';


export const UserLoginForm = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);

    const schema = yup.object().shape({
        login: yup.string().required('Login is required'),
        password: yup.string().required('Password is required'),
    });

    const form = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = form;

    const onSubmit = (userCredentials: ApiUserCredentials) => dispatch(login(userCredentials));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              field={{
                    form,
                    label: 'Login',
                    name: 'login',
                }}
            />
            <TextField
              field={{
                    form,
                    label: 'Password',
                    name: 'password',
                }}
              type={'password'}
            />
            <SubmitButton isLoading={authStatus === 'LOADING'}>
                Sign in
            </SubmitButton>
        </form>
    );
};
