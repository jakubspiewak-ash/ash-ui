import { Button, Spinner } from '@chakra-ui/react';

export interface SubmitButtonProps {
    children?: string;
    isLoading?: boolean;
    form?: string;
}


export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, isLoading, form } = props;

    return (
        <Button
          boxShadow={'xl'}
          disabled={isLoading}
          form={form}
          p={4}
          type={'submit'}
          variant="outline"
          width="full"
        >
            {isLoading ? <Spinner/> : (children || 'Submit')}
        </Button>
    );
};
