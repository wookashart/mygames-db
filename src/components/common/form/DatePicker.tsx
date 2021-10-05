/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

// === Components === //
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface DatePickerProps {
  value: Date | null;
  handleChange: Function;
  label: string;
}

const DatePicker = ({ value, label, handleChange }: DatePickerProps) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible ? (
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
      ) : (
        <Skeleton variant="rectangular" height={56} />
      )}

      <style jsx global>{`
        .customDataPicker button {
          color: white;
        }
      `}</style>
    </>
  );
};

export default DatePicker;
