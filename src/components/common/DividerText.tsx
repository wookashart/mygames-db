import React from 'react';

// === Components === //
import { colors, Divider, Typography } from '@mui/material';

interface DividerTextProps {
  text: string;
  position?: 'center' | 'left' | 'right';
}

const DividerText = ({ text, position = 'center' }: DividerTextProps) => {
  return (
    <Divider
      textAlign={position}
      sx={{
        marginTop: 1,
        marginBottom: 1,
        '::before': { borderColor: colors.grey[700] },
        '::after': { borderColor: colors.grey[700] },
      }}
    >
      <Typography variant="subtitle1" component="p" color="white">
        {text}
      </Typography>
    </Divider>
  );
};

export default DividerText;
