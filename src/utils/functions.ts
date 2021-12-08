export const isNumber = (value: string): boolean => {
    return !!value && value.length !== 0 && !isNaN(Number(value));
};

export const formatNumber = (value: string): string => {
    return isNumber(value) ? Number(value).toFixed(2) : '';
};