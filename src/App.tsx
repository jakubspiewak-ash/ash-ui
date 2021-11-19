import { Box, ChakraProvider, Container, theme } from '@chakra-ui/react';

import { AppRouting } from './components/AppRouting';
import { ThemeToggle } from './components/common/ThemeToggle';
import { AuthContextProvider } from './providers/common/AuthContextProvider';
import { ErrorInfoContextProvider } from './providers/common/ErrorInfoContextProvider';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorInfoContextProvider>
        <AuthContextProvider>
          <Container
            maxWidth={'60rem'}
            mt={8}
          >
            <Box
              __css={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
              }}
            >
              <ThemeToggle />
            </Box>
            <AppRouting />
          </Container>
        </AuthContextProvider>
      </ErrorInfoContextProvider>
    </ChakraProvider>
  );
}

export default App;
