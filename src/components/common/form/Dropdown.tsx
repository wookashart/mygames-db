import React from 'react';

// === Components === //
import { TextField } from '@material-ui/core';
import { Autocomplete, colors, Paper } from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { DropdownOptionsData } from '../../../types/forms';

interface DropdownProps {
  id: string;
  options: DropdownOptionsData[];
  value: DropdownOptionsData | null | undefined;
  handleChange: Function;
  error?: boolean;
  helperText?: string | boolean;
}

const Dropdown = ({
  id,
  options,
  value,
  error = false,
  helperText = false,
  handleChange,
}: DropdownProps) => {
  return (
    <Autocomplete
      fullWidth
      id={id}
      options={options}
      value={value}
      getOptionLabel={(option) => option.title}
      onChange={(e, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Producent"
          variant="filled"
          error={error}
          helperText={helperText}
        />
      )}
      PaperComponent={({ children }) => (
        <Paper
          style={{
            background: colors.grey[700],
            color: customColors.textLight,
            fontSize: 16,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {children}
        </Paper>
      )}
      popupIcon={<ArrowDropDown sx={{ color: customColors.textLight }} />}
      clearIcon={<Close sx={{ color: customColors.textLight }} />}
    />
  );
};

export default Dropdown;
