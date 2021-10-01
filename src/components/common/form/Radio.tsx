/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// === Components === //
import { FormLabel, FormControlLabel, Radio, RadioGroup, colors } from '@mui/material';

interface RadioProps {
  label: string;
  name: string;
  value: string | number;
  options: OptionsData[];
  handleChange: Function;
}

interface OptionsData {
  value: string | number;
  label: string;
}

const CustomRadio = ({ label, name, value, options, handleChange }: RadioProps) => {
  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row name={name}>
        {options.map((opt, index) => (
          <FormControlLabel
            key={index}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              svg: {
                color: colors.blue[600],
              },
            }}
            checked={value === opt.value ? true : false}
            onChange={(e: any) => handleChange(e.target.value)}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default CustomRadio;
