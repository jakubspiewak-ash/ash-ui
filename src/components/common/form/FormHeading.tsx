import {FormHeadingProps} from "./components.types";
import {Heading} from "@chakra-ui/react";

export const FormHeading = ({children}: FormHeadingProps) => {
    return <Heading size={"lg"} color={"blackAlpha.500"}>{children}</Heading>
}