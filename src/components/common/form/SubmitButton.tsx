import { Button, Spinner } from '@chakra-ui/react';

export interface SubmitButtonProps {
    children?: string;
    isLoading?: boolean;
    formName?: string;
}


export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, isLoading, formName } = props;

    return (
        <Button
          boxShadow={'xl'}
          disabled={isLoading}
          form={formName}
          p={4}
          type={'submit'}
          variant="outline"
          width="full"
        >
            {isLoading ? <Spinner/> : (children || 'Submit')}
        </Button>
    );
};
