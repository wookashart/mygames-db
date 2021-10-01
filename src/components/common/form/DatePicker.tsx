/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// === Components === //
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface DatePickerProps {
  value: Date | null;
  handleChange: Function;
  label: string;
}

const DatePicker = ({ value, label, handleChange }: DatePickerProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={(value) => handleChange(value)}
          renderInput={(params) => {
            return (
              <TextField
                className="customDataPicker"
                fullWidth
                variant="filled"
                {...(params as any)}
              />
            );
          }}
        />
      </LocalizationProvider>
      <style jsx global>{`
        .customDataPicker button {
          color: white;
        }
      `}</style>
    </>
  );
};

export default DatePicker;
