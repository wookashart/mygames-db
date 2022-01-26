import React from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellDefaultProps {
  value: string | number | null;
  color?: string;
}

const CellDefault = ({ value, color }: CellDefaultProps) => {
  return (
    <TableCell>
      <Typography color={color ? color : customColors.textLight}>{value ? value : '-'}</Typography>
    </TableCell>
  );
};

export default CellDefault;
