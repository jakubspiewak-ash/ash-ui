import { useBreakpointValue } from '@chakra-ui/react';

export const useIsMdBreakpoint = () => {
    return useBreakpointValue({ base: false, md: true });
}; 
