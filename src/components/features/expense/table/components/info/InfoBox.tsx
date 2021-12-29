import { Box } from '@chakra-ui/react';

import { HasChildren } from '../../../../../common/common.types';

interface InfoBoxProps extends HasChildren {
}

export const InfoBox = (props: InfoBoxProps) => {
    const { children } = props;
    return (
        <Box
          borderRadius={16}
          borderWidth={1}
          padding={8}
        >
            {children}
        </Box>
    );
};