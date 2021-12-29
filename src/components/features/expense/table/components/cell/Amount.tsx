import { Box, Grid, SlideFade } from '@chakra-ui/react';

import { useAppSelector } from '../../../../../../redux/hooks';
import { formatNumber } from '../../../../../../utils/functions';
import { useIsMdBreakpoint } from '../../../../../../utils/hooks';
import { TableData } from '../TableData';
import { TableCellProps } from '../types';

const NumberBox = ({ num }: { num: number }) => {
    return (
        <Box
          justifySelf={'end'}
          whiteSpace={'nowrap'}
        >
            {formatNumber(num)}
        </Box>
    );
};

export const Amount = (props: TableCellProps) => {
    const { expense: { id, amount: { net, gross } } } = props;
    const { currentInfo } = useAppSelector((state) => state.expense.table);

    const md = useIsMdBreakpoint();

    return (
        <TableData hidden={!md}>
            <SlideFade in={currentInfo !== id}>
                <Grid
                  columnGap={2}
                  templateColumns={'repeat(2, 1fr)'}
                >
                    <Box>Gross:</Box>
                    <NumberBox num={gross}/>
                    <Box>Net:</Box>
                    <NumberBox num={net}/>
                </Grid>
            </SlideFade>
        </TableData>
    );

};
