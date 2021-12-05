import { Button, Spinner } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export interface SubmitButtonProps {
    children?: string;
    afterSubmitting?: () => void;
    isLoading?: boolean;
}


export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, afterSubmitting, isLoading } = props;
    const { submitForm } = useFormikContext();

    const handleSubmitForm = async () => {
        submitForm().then(() => afterSubmitting?.());
    };

    return (
        <Button
          boxShadow={'xl'}
          disabled={isLoading}
          p={4}
          variant="outline"
          width="full"
          onClick={handleSubmitForm}
        >
            {isLoading ? <Spinner/> : (children || 'Submit')}
        </Button>
    );
};
