import { ChakraProvider, Container, theme } from '@chakra-ui/react';


import { AppRouting } from './components/AppRouting';
import { ApplicationSettings } from './components/common/ApplicationSettings';
import { ErrorInfoContextProvider } from './providers/common/ErrorInfoContextProvider';


function App() {
    return (
        <ChakraProvider theme={theme}>
            <ErrorInfoContextProvider>
                <ApplicationSettings/>
                <Container
                  maxWidth={'60rem'}
                  mt={8}
                >
                    <AppRouting/>
                </Container>
            </ErrorInfoContextProvider>
        </ChakraProvider>
    );
}

export default App;
