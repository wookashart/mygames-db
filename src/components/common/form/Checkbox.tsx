import React from 'react';

// === Components === //
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { colors, makeStyles } from '@material-ui/core';

// === Styles === //
import { customColors } from '../../../styles/variables';

interface CheckboxProps {
  id: string;
  label: string;
  value: boolean;
  handleChange: Function;
}

const Checkbox = ({ id, label, value, handleChange }: CheckboxProps) => {
  const useStyles = makeStyles(() => ({
    root: {
      '& .MuiTypography-root': { color: customColors.textLight },
      '& .MuiSwitch-thumb': { color: colors.grey[500] },
      '& .Mui-checked .MuiSwitch-thumb': { color: colors.blue[500] },
      '& .MuiSwitch-track': { backgroundColor: colors.grey[500] },
    },
  }));
  const c = useStyles();

  return (
    <FormGroup>
      <FormControlLabel
        id={id}
        control={
          <Switch
            color="primary"
            checked={value}
            onChange={(e) => handleChange(e.target.checked)}
          />
        }
        label={label}
        className={c.root}
      />
    </FormGroup>
  );
};

export default Checkbox;
