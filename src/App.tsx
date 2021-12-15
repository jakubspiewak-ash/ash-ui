import { ChakraProvider, Container, theme } from '@chakra-ui/react';


import { AppRouting } from './components/AppRouting';
import { ApplicationSettings } from './components/common/ApplicationSettings';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ApplicationSettings/>
            <Container
              maxWidth={'60rem'}
              mt={8}
            >
                <AppRouting/>
            </Container>
        </ChakraProvider>
    );
}

export default App;
