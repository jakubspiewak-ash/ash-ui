import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface Field<T extends FieldValues = FieldValues> {
    label: string,
    name: string,
    form: UseFormReturn<T>
}
