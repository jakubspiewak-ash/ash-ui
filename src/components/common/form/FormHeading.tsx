import {Box, Heading} from "@chakra-ui/react";

export const FormHeading = ({children}: { children: string }) => {
    return (
        <Box textAlign={"center"} mb={4}>
            <Heading>{children}</Heading>
        </Box>
    )
}