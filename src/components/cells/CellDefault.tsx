import React from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellDefaultProps {
  value: string | number | null;
}

const CellDefault = ({ value }: CellDefaultProps) => {
  return (
    <TableCell>
      <Typography color={customColors.textLight}>{value ? value : '-'}</Typography>
    </TableCell>
  );
};

export default CellDefault;
