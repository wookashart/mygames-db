import React, { Fragment, useEffect, useRef, useState } from 'react';

// === Components === //
import { TextField } from '@material-ui/core';
import { Autocomplete, Chip, colors, Paper } from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';

// === Helpers === //
import throttle from 'lodash.throttle';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { DropdownOptionsData } from '../../../types/forms';
import { GamesListForDropdownData } from '../../../types/games';

interface DropdownProps {
  id: string;
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
  const [options, setOptions] = useState<readonly DropdownOptionsData[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const throttled = useRef(
    throttle((newValue) => {
      setLoading(true);

      fetch(`/api/games-dropdown${newValue && newValue !== '' ? `?name=${newValue}` : ''}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            setOptions(
              json.items.map((item: GamesListForDropdownData) => ({
                title: item.namePl && item.namePl !== '' ? item.namePl : item.name,
                value: item.id,
              }))
            );
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1000)
  );

  useEffect(() => throttled.current(inputValue), [inputValue]);

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
      loading={loading}
      getOptionLabel={(option) => option.title}
      onChange={(e, value) => handleChange(value)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
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
      filterOptions={(x) => x}
    />
  );
};

export default Dropdown;
