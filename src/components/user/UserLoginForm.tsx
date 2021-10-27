import { Formik } from 'formik';

import { useAuthContext } from '../../providers/common/AuthContextProvider';
import { ApiUserCredentials } from '../../services/api.types';
import { FormInput } from '../common/form/FormInput';
import { SubmitButton } from '../common/form/SubmitButton';

const emptyForm: ApiUserCredentials = {
  login: '',
  password: '',
};

export const UserLoginForm = () => {
  const { login } = useAuthContext();

  return (
    <Formik
      initialValues={emptyForm}
      enableReinitialize
      onSubmit={login}
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
        <SubmitButton>Sign in</SubmitButton>
      </>
    </Formik>
  );
};
