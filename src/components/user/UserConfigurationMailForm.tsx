import { Stack } from '@chakra-ui/react';
import { FormInput } from '../common/form/FormInput';
import { FormHeading } from '../common/form/FormHeading';

export const UserConfigurationMailForm = () => (
  <Stack>
    <FormHeading>Mail</FormHeading>
    <FormInput name="mail.mailAddress" label="Mail address" />
    <FormInput name="mail.password" type="password" label="Password" />
    <FormInput name="mail.host" label="Host" />
    <FormInput name="mail.port" label="Port" />
  </Stack>
);
