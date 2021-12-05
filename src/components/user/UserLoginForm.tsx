import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/reducer/AuthSlice';
import { ApiUserCredentials } from '../../services/api.types';
import { FormInput } from '../common/form/FormInput';
import { SubmitButton } from '../common/form/SubmitButton';


export const UserLoginForm = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);

    const schema = yup.object().shape({
        login: yup.string().required('Login is required'),
        password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<ApiUserCredentials>({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const onSubmit = (userCredentials: ApiUserCredentials) => dispatch(login(userCredentials));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              error={errors.login?.message}
              label="Login"
              registration={register('login')}
            />
            <FormInput
              error={errors.password?.message}
              label="Password"
              registration={register('password')}
              type="password"
            />
            <SubmitButton isLoading={authStatus === 'LOADING'}>
                Sign in
            </SubmitButton>
        </form>
    );
};
