import { Icon } from "@chakra-ui/icons";
import { Td, Text, Tooltip } from "@chakra-ui/react";
import { RiMailCheckLine } from "react-icons/ri";

import { ApiExpense, ApiExpenseMailConfig } from "../../../../services/api.types";

const TooltipContent = (mailConfig: ApiExpenseMailConfig) => {
    const { mailAddress, attachmentPattern } = mailConfig;

    return (
        <>
            <Text>
                <b>Mail: </b>
                {mailAddress}
            </Text>
            <Text>
                <b>Attachment: </b>
                {attachmentPattern}
            </Text>
        </>
    );
};

export const MailConfig = ({ mailConfig }: ApiExpense) => {
    if (!mailConfig) {
        return <Td/>;
    }
    return (
        <Td textAlign='center'>
            <Tooltip
              label={<TooltipContent {...mailConfig}/>}
              hasArrow
            >
                <span>
                    <Icon
                      as={RiMailCheckLine}
                      color={'green.500'}
                      h={6}
                      w={6}
                    />
                </span>
            </Tooltip>
        </Td>
    );
};
