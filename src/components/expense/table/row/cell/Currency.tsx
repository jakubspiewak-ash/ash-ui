import { ExpenseGridItemProps } from './index';

export const Currency = ({ expense }: ExpenseGridItemProps) => {
    const { amount: { currency } } = expense;
    return (
        <> {currency}</>
    );
};