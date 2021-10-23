import { Stack } from '@chakra-ui/react';
import { FormInput } from '../common/form/FormInput';
import { FormHeading } from '../common/form/FormHeading';

export const UserConfigurationMailForm = () => (
  <Stack>
    <FormHeading>Mail</FormHeading>
    <FormInput field="mail.mailAddress" label="Mail address" />
    <FormInput field="mail.password" type="password" label="Password" />
    <FormInput field="mail.host" label="Host" />
    <FormInput field="mail.port" label="Port" />
  </Stack>
);
