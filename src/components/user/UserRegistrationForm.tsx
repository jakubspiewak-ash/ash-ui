import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormInput } from '../common/form/FormInput';
import { ApiUserCredentials } from '../../services/api.types';
import { SubmitButton } from '../common/form/SubmitButton';
import { saveUser } from '../../services/user.service';
import { useErrorInfoContext } from '../../providers/common/ErrorInfoContextProvider';

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
    <Formik
      enableReinitialize
      initialValues={initialFormValue}
      onSubmit={onSubmit}
    >
      <>
        <FormInput name="login" label="Login" />
        <FormInput name="password" label="Password" type="password" />
        <SubmitButton />
      </>
    </Formik>
  );
};
