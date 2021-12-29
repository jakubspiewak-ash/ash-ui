import { Collapse, SimpleGrid } from '@chakra-ui/react';

import { useAppSelector } from '../../../../../../redux/hooks';
import { ApiExpense } from '../../../../../../services/api.types';
import { TableData } from '../TableData';

import * as InfoPart from './parts';

interface ExpenseInfoProps {
    expense: ApiExpense
}

export const ExpenseInfo = (props: ExpenseInfoProps) => {
    const { expense } = props;
    const { id } = expense;

    const { currentInfo } = useAppSelector((state) => state.expense.table);

    return (
        <TableData
          padding={0}
          size={6}
        >
            <Collapse
              in={currentInfo === id}
              animateOpacity
            >
                <SimpleGrid
                  columns={[1, 2, 3]}
                  gap={4}
                  py={4}
                >
                    <InfoPart.Amount expense={expense}/>
                    <InfoPart.IsPrivate expense={expense}/>
                    <InfoPart.DateRange expense={expense}/>
                    <InfoPart.MailConfig expense={expense}/>
                    <InfoPart.Actions expense={expense}/>
                </SimpleGrid>
            </Collapse>
        </TableData>
    );
};