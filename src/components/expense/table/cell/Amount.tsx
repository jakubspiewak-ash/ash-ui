import { useMemo } from "react";

import { Box, Grid, GridItem, Td, Text } from "@chakra-ui/react";

import { ApiExpense } from "../../../../services/api.types";
import { numberWithSpaces } from "../../summary/CurrencySummary";

const CompanyAmount = ({ amount: { net, gross } }: ApiExpense) => {
    return (
        <Grid
          alignItems={'center'}
          gridGap={1}
          templateColumns={"repeat(2, 1fr)"}
          templateRows={"repeat(2, 1fr)"}
        >
            <GridItem as={"b"}>Net:</GridItem>
            <GridItem>
                <Text
                  pl={2}
                  whiteSpace={'nowrap'}
                >
                    {numberWithSpaces(net)}
                </Text>
            </GridItem>
           <GridItem as={"b"}>Gross:</GridItem>
            <GridItem>
                <Text 
                  pl={2} 
                  whiteSpace={'nowrap'}
                >
                    {numberWithSpaces(gross)}
                </Text>
            </GridItem>
        </Grid>
    );
};

const PrivateAmount = ({ amount: { net } }: ApiExpense) => {
    return (
        <Box>{numberWithSpaces(net)}</Box>
    );
};

export const Amount = (expense: ApiExpense) => {
    const { isPrivate } = expense;
    const AmountComponent = useMemo(() => {
        return isPrivate ? <PrivateAmount {...expense}/> : <CompanyAmount {...expense}/>;
    }, [isPrivate]);

    return (
        <Td isNumeric>
            {AmountComponent}
        </Td>
    );
};
