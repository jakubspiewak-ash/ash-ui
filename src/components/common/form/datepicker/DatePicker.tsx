import React, {HTMLAttributes} from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import {FormControl, FormHelperText, FormLabel} from "@chakra-ui/react";

interface Props {
    isClearable?: boolean;
    onChange: (date: Date) => any;
    selectedDate: Date | undefined;
    showPopperArrow?: boolean;
}

export const DatePicker = ({
                               selectedDate,
                               onChange,
                               isClearable = false,
                               showPopperArrow = false,
                           }: Props & HTMLAttributes<HTMLElement>) => {
    return (
        <FormControl>
            <FormLabel htmlFor="published-date">Published Date</FormLabel>
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                isClearable={isClearable}
                showPopperArrow={showPopperArrow}
            />
            <FormHelperText>Date this widget was published</FormHelperText>
        </FormControl>
    );
};