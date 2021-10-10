import { Box, Heading } from '@chakra-ui/react';

export interface FormHeadingProps {
    children: string;
}

export const FormHeading = ({ children }: FormHeadingProps) => (
  <Box textAlign="center" mb={4}>
    <Heading>{children}</Heading>
  </Box>
);
