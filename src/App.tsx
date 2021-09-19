import {ChakraProvider, Heading, Square, Stack} from "@chakra-ui/react";
import {TempDevelopmentPage} from "./pages/TempDevelopmentPage";

function App() {
    return (
        <ChakraProvider>
            <Stack>
                <Heading>
                    Ash application
                </Heading>
                <Square>
                    <TempDevelopmentPage/>
                </Square>
            </Stack>
        </ChakraProvider>
    );
}

export default App;
