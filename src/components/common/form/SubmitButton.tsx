import { useState } from 'react';

import { Button, Spinner } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export interface SubmitButtonProps {
    children?: string;
    afterSubmitting?: () => void;
}


export const SubmitButton = ({ children, afterSubmitting }: SubmitButtonProps) => {
    const { submitForm } = useFormikContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async () => {
        setIsLoading(true);
        submitForm()
            .then(() => setTimeout(() => setIsLoading(false), 500))
            .then(() => afterSubmitting?.());
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
