import { useEffect, useState } from 'react';

import { Heading, Stack } from '@chakra-ui/react';
import { Formik } from 'formik';

import { ApiUserConfiguration } from '../../services/api.types';
import { fetchUserConfiguration, saveUserConfiguration } from '../../services/user.service';
import { SubmitButton } from '../common/form/SubmitButton';

import { UserConfigurationMailForm } from './UserConfigurationMailForm';

const emptyForm: ApiUserConfiguration = {
  mail: {
    address: '',
    host: '',
    password: '',
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
        initialValues={formValue}
        enableReinitialize
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
