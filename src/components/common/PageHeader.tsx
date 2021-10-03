import React from 'react';

// === Components === //
import { Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Typography
      variant="h1"
      component="h1"
      fontSize="2rem"
      fontWeight="normal"
      color="white"
      sx={{
        textTransform: 'uppercase',
      }}
      mt={1}
      mb={3}
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
