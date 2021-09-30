import {ChakraProvider} from "@chakra-ui/react";
import {AuthContextProvider} from "./components/common/AuthContextProvider";
import {AppRouting} from "./components/AppRouting";


function App() {
    return (
        <AuthContextProvider>
            <ChakraProvider>
                <AppRouting/>
            </ChakraProvider>
        </AuthContextProvider>
    );
}

export default App;
