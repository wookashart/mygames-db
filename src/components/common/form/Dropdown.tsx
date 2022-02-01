import React, { Fragment } from 'react';

// === Components === //
import { TextField } from '@material-ui/core';
import { Autocomplete, Chip, colors, Paper } from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { DropdownOptionsData } from '../../../types/forms';

interface DropdownProps {
  id: string;
  options: DropdownOptionsData[];
  value: DropdownOptionsData | null | undefined;
  error?: boolean;
  helperText?: string | boolean;
  freeSolo?: boolean;
  disableClearable?: boolean;
  label: string;
  multiple?: boolean;
  disabled?: boolean;
  handleChange: Function;
}

const Dropdown = ({
  id,
  options,
  value,
  error = false,
  helperText = false,
  freeSolo = false,
  disableClearable = false,
  label,
  multiple = false,
  disabled = false,
  handleChange,
}: DropdownProps) => {
  return (
    <Autocomplete
      fullWidth
      id={id}
      freeSolo={freeSolo}
      disableClearable={disableClearable}
      options={options}
      value={value}
      multiple={multiple}
      disabled={disabled}
      getOptionLabel={(option) => option.title}
      onChange={(e, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label}
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
      renderTags={(value: readonly DropdownOptionsData[], getTagProps) =>
        value.map((option: DropdownOptionsData, index: number) => (
          <Fragment key={option.value}>
            <Chip
              variant="filled"
              color="primary"
              label={option.title}
              {...getTagProps({ index })}
            />
          </Fragment>
        ))
      }
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
};

export default Dropdown;
