export const isNumber = (value: string): boolean => {
    return !!value && value.length !== 0 && !isNaN(Number(value));
};


export function numberWithWhiteSpace(x: number) {
    const y = x.toFixed(2);
    const parts = y.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

export const formatNumber = (value: string | number): string | undefined => {
    return isNumber(value.toString()) ? numberWithWhiteSpace(Number(value)) : undefined;
};