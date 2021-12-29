import { Grid, Text } from '@chakra-ui/react';
import { MdOutlineAttachFile, MdOutlineMail } from 'react-icons/all';

import { HasExpense } from '../../types';
import { InfoBox } from '../InfoBox';

export const MailConfig = (props: HasExpense) => {
    const { expense } = props;
    const { mailConfig } = expense;

    if (!mailConfig) {
        return null;
    }

    const { mailAddress, attachmentPattern } = mailConfig;

    return (
        <InfoBox>
            <Text
              fontSize={'xl'}
              mb={4}
            >
                Mail config:
            </Text>
            <Grid
              alignItems={'center'}
              columnGap={2}
              templateColumns={'min-content 1fr'}
            >
                <MdOutlineMail/>
                <Text><i>{mailAddress}</i></Text>
                <MdOutlineAttachFile/>
                <Text><i>{attachmentPattern}</i></Text>
            </Grid>
        </InfoBox>
    );
};
