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
            .then(() => setIsLoading(false))
            .then(() => afterSubmitting?.());
    };

    return (
        <Button
          boxShadow={'xl'}
          p={4}
          variant="outline"
          width="full"
          onClick={handleSubmitForm}
        >
            {isLoading ? <Spinner/> : (children || 'Submit')}
        </Button>
    );
};
