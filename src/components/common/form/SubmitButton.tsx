import { Button, Spinner } from '@chakra-ui/react';

export interface SubmitButtonProps {
    children?: string;
    afterSubmitting?: () => void;
    isLoading?: boolean;
}


export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, isLoading } = props;

    // const handleSubmitForm = async () => {
    //     // submitForm().then(() => afterSubmitting?.());
    // };

    return (
        <Button
          boxShadow={'xl'}
          disabled={isLoading}
          p={4}
          type={'submit'}
          variant="outline"
          width="full"
            // onClick={handleSubmitForm}
        >
            {isLoading ? <Spinner/> : (children || 'Submit')}
        </Button>
    );
};
