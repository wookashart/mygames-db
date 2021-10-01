import React from 'react';

// === Components === //
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// === Styles === //
import { Button } from '@mui/material';

interface InputFileProps {
  label: string;
  handleChange: Function;
}

const InputFile = ({ label, handleChange }: InputFileProps) => {
  return (
    <>
      <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
        {label}
        <input type="file" hidden onChange={(e) => handleChange(e)} />
      </Button>
    </>
  );
};

export default InputFile;
