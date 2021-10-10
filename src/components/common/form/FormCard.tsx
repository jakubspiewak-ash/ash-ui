import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HasChildren } from '../common.types';

export interface FormCardProps extends HasChildren {
    bellow?: ReactNode;
}

export const FormCard = ({ children, bellow }: FormCardProps) => (
  <Flex width="full" height="full" align="center" justifyContent="center">
    <Box p={2}>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        {children}
      </Box>
      {bellow}
    </Box>
  </Flex>
);
