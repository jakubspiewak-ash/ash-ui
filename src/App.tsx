import {Box, ChakraProvider, theme} from "@chakra-ui/react";
import {AuthContextProvider} from "./components/common/AuthContextProvider";
import {AppRouting} from "./components/AppRouting";
import {ThemeToggle} from "./components/common/ThemeToggle";
import {ErrorInfoContextProvider} from "./components/common/ErrorInfoContextProvider";


function App() {
    return (
        <ChakraProvider theme={theme}>
            <ErrorInfoContextProvider>
                <AuthContextProvider>
                    <Box __css={{
                        position: "absolute",
                        top: "2rem",
                        right: "2rem"
                    }}>
                        <ThemeToggle/>
                    </Box>
                    <AppRouting/>
                </AuthContextProvider>
            </ErrorInfoContextProvider>
        </ChakraProvider>
    );
}

export default App;
