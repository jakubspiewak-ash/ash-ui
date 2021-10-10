import { Heading, Stack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { UserConfigurationMailForm } from './UserConfigurationMailForm';
import { SubmitButton } from '../common/form/SubmitButton';
import { ApiUserConfiguration } from '../../services/api.types';
import { fetchUserConfiguration, saveUserConfiguration } from '../../services/user.service';

const emptyForm: ApiUserConfiguration = {
  mail: {
    address: '',
    password: '',
    host: '',
    port: 0,
  },
};

export const UserConfigurationForm = () => {
  const [formValue, setFormValue] = useState(emptyForm);

  const fetchConfiguration = () => {
    fetchUserConfiguration().then((v) => v && setFormValue(v));
  };

  const saveConfiguration = (configuration: ApiUserConfiguration) => {
    saveUserConfiguration(configuration).then(fetchUserConfiguration);
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  return (
    <Stack>
      <Heading>Configuration</Heading>
      <Formik<ApiUserConfiguration>
        enableReinitialize
        initialValues={formValue}
        onSubmit={(values) => saveConfiguration(values)}
      >
        <>
          <UserConfigurationMailForm />
          <SubmitButton />
        </>
      </Formik>
    </Stack>
  );
};
