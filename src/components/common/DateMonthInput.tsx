import { useState } from "react";

import {
    FormControl,
    FormErrorIcon,
    FormLabel,
    IconButton,
    InputGroup,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, FaSearch } from "react-icons/all";

interface DateInputProps {
    label: string,
    disabled?: boolean,
    onSearch: ({ month, year }: { month: number, year: number }) => void,
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export const DateMonthInput = ({ label, onSearch }: DateInputProps) => {
    const [{ month, year }, setState] = useState({ month: currentDate.getMonth() + 1, year: currentYear });

    const onSearchClick = () => {
        onSearch({ month, year });
    };

    const onLeftArrowClick = () => {
        const newYearMonth = month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };
        onSearch(newYearMonth);
        setState(newYearMonth);
    };

    const onRightArrowClick = () => {
        const newYearMonth = month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };
        onSearch(newYearMonth);
        setState(newYearMonth);
    };

    return (
        <FormControl mb={4}>
            <FormLabel>
                <FormErrorIcon
                  color={"red.400"}
                  mr={2}
                />
                {label}
            </FormLabel>
            <InputGroup>
                <NumberInput
                  max={12}
                  min={1}
                  value={month}
                  allowMouseWheel
                  onChange={(_, value) => setState({ month: value, year })}
                >
                    <NumberInputField
                      borderEndRadius={0}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
                <NumberInput
                  max={currentYear + 20}
                  min={currentYear - 20}
                  value={year}
                  allowMouseWheel
                  onChange={(_, value) => setState({ month, year: value })}
                >
                    <NumberInputField
                      borderEndRadius={0}
                      borderStartRadius={0}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                    </NumberInputStepper>
                </NumberInput>
                <IconButton
                  aria-label='delete'
                  borderEndRadius={0}
                  borderStartRadius={0}
                  icon={<AiOutlineArrowLeft/>}
                  onClick={onLeftArrowClick}
                />
                <IconButton
                  aria-label='delete'
                  borderEndRadius={0}
                  borderStartRadius={0}
                  icon={<FaSearch/>}
                  onClick={onSearchClick}
                />
                <IconButton
                  aria-label='delete'
                  borderStartRadius={0}
                  icon={<AiOutlineArrowRight/>}
                  onClick={onRightArrowClick}
                />
            </InputGroup>
        </FormControl>
    );
};