import React from "react";

import { Icon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdAccountBalance, MdAccountCircle } from "react-icons/md";

import { ExpenseGridItemProps } from "./index";

interface TooltipIconProps {
    label: string,
    icon: IconType
}

const TooltipIcon = ({ icon, label }: TooltipIconProps) => {
    return (
        <Tooltip
          label={label}
          hasArrow
        >
                <span>
                    <Icon
                      as={icon}
                      h={6}
                      w={6}
                    />
                </span>
        </Tooltip>
    );
};

export const IsPrivate = (props: ExpenseGridItemProps) => {
    const { expense: { isPrivate } } = props;

    return isPrivate ?
        <TooltipIcon
          icon={MdAccountCircle}
          label={'Private'}
        /> :
        <TooltipIcon
          icon={MdAccountBalance}
          label={'Company'}
        />;
};