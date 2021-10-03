import {Box, Flex} from "@chakra-ui/react";
import {ReactNode, ReactNodeArray} from "react";

export const FormCard = ({children, bellow}: { children: ReactNode | ReactNodeArray, bellow?: ReactNode }) => {
    return (
        <Flex width={"full"} height={"full"} align={"center"} justifyContent={"center"}>
            <Box p={2}>
                <Box p={8} maxWidth={"500px"} borderWidth={1} borderRadius={8} boxShadow="lg">
                    {children}
                </Box>
                {bellow}
            </Box>
        </Flex>
    )
}