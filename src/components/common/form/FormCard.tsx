import { ReactNode } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { HasChildren } from '../common.types';

export interface FormCardProps extends HasChildren {
    bellow?: ReactNode;
}

export const FormCard = ({ children, bellow }: FormCardProps) => (
  <Flex
    align="center"
    height="full"
    justifyContent="center"
    width="full"
  >
    <Box p={2}>
      <Box
        borderRadius={8}
        borderWidth={1}
        boxShadow="lg"
        maxWidth="500px"
        p={8}
      >
        {children}
      </Box>
      {bellow}
    </Box>
  </Flex>
);
