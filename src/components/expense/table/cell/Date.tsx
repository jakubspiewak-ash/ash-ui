import { Icon } from "@chakra-ui/icons";
import { Grid, GridItem, Td } from "@chakra-ui/react";
import { IoInfiniteSharp } from "react-icons/all";

import { ApiExpense } from "../../../../services/api.types";

export const InfiniteIcon = () => <Icon as={IoInfiniteSharp}/>;


export const Date = ({ date: { start, end } }: ApiExpense) => {
    return (
        <Td>
            <Grid
              gridGap={1}
              templateColumns={"repeat(2, 1fr)"}
              templateRows={"repeat(2, 1fr)"}
              textAlign={'end'}
            >
                <GridItem as={"b"}>From:</GridItem>
                <GridItem textAlign={'center'}>
                    {start?.toLocaleDateString() || <InfiniteIcon/>}
                </GridItem>
                <GridItem as={"b"}>To:</GridItem>
                <GridItem textAlign={'center'}>
                    {end?.toLocaleDateString() || <InfiniteIcon/>}
                </GridItem>
            </Grid>
        </Td>
    );
};