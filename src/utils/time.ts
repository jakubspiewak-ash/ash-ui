import { YearMonth } from './types';

interface DateDiff {
    years?: number,
    months?: number,
    days?: number
}

export const getDatesDiff = (d1: Date, d2: Date): DateDiff => {
    let dy = d1.getFullYear() - d2.getFullYear();
    let dm = d1.getMonth() - d2.getMonth();
    let dd = d1.getDate() - d2.getDate();

    if (dd < 0) {
        dm -= 1;
        dd += 30;
    }
    if (dm < 0) {
        dy -= 1;
        dm += 12;
    }

    return {
        days: dd === 0 ? undefined : dd,
        months: dm === 0 ? undefined : dm,
        years: dy === 0 ? undefined : dy,
    };
};

export const getCurrentMonth = (): YearMonth => {
    const today = new Date();
    return {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    };
};