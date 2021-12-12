export const isNumber = (value: string): boolean => {
    return !!value && value.length !== 0 && !isNaN(Number(value));
};

export const formatNumber = (value: string): string | undefined => {
    return isNumber(value) ? Number(value).toFixed(2) : undefined;
};