import {Box, IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons"

export const ThemeToggle = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Box textAlign="right" py={4} mr={12}>
            <IconButton
                icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label={"theme-button"}/>
        </Box>
    );
}