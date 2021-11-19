import { useMemo } from "react";

import { Icon } from "@chakra-ui/icons";
import { Td, Tooltip } from "@chakra-ui/react";
import { MdAccountBalance, MdAccountCircle } from "react-icons/md";

import { ApiExpense } from "../../../../services/api.types";


export const IsPrivate = ({ isPrivate }: ApiExpense) => {
    const IsPrivateIcon = useMemo(() => {
        return isPrivate ?
            <Tooltip
              label={'Private'}
              hasArrow
            >
                <span>
                    <Icon
                      as={MdAccountCircle}
                      h={6}
                      w={6}
                    />
                </span>
            </Tooltip>
            :
            <Tooltip
              label={'Company'}
              hasArrow
            >
                <span>
            <Icon
              as={MdAccountBalance}
              h={6}
              w={6}
            />
                </span>
            </Tooltip>;
    }, [isPrivate]);

    return (
        <Td textAlign='center'>
            {IsPrivateIcon}
        </Td>
    );
};