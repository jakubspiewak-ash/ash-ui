import { Box, Heading } from '@chakra-ui/react';

export interface FormHeadingProps {
    children: string;
}

export const FormHeading = ({ children }: FormHeadingProps) => (
  <Box
    mb={4}
    textAlign="center"
  >
    <Heading>{children}</Heading>
  </Box>
);
