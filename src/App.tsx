import {
  Box, ChakraProvider, Container, theme,
} from '@chakra-ui/react';
import { AuthContextProvider } from './providers/common/AuthContextProvider';
import { AppRouting } from './components/AppRouting';
import { ThemeToggle } from './components/common/ThemeToggle';
import { ErrorInfoContextProvider } from './providers/common/ErrorInfoContextProvider';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorInfoContextProvider>
        <AuthContextProvider>
          <Container>
            <Box __css={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
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
