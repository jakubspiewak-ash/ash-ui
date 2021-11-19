import { Center, Grid, GridItem, Td, Text } from "@chakra-ui/react";
import { ImBlocked } from "react-icons/all";

import { ApiExpense } from "../../../../services/api.types";
import { numberWithSpaces } from "../../summary/CurrencySummary";

export const Vat = ({ amount: { vat, gross, net } }: ApiExpense) => {
    if (vat === 0) {
        return (
            <Td textAlign={'center'}>
                <Center>
                    <ImBlocked/>
                </Center>
            </Td>
        );
    }
    return (
        <Td isNumeric>
            <Grid
              alignItems={'center'}
              gridGap={1}
              templateColumns={"repeat(2, 1fr)"}
              templateRows={"repeat(2, 1fr)"}
            >
                <GridItem as={"b"}>Rate:</GridItem>
                <GridItem>
                    <Text
                      pl={2}
                      whiteSpace={'nowrap'}
                    >
                        {`${vat}%`}
                    </Text>
                </GridItem>
                <GridItem as={"b"}>Value:</GridItem>
                <GridItem>
                    <Text
                      pl={2}
                      whiteSpace={'nowrap'}
                    >
                        {numberWithSpaces(gross - net)}
                    </Text>
                </GridItem>
            </Grid>
        </Td>

    );
};