import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      mr={12}
      py={4}
      textAlign="right"
    >
      <IconButton
        aria-label="theme-button"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        variant="ghost"
        onClick={toggleColorMode}
      />
    </Box>
  );
};
