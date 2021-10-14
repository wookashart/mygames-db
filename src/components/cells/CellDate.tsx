import React from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';

// === Helpers === //
import dateFormat from 'dateformat';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellDateProps {
  value: Date | string | null;
}

const CellDate = ({ value }: CellDateProps) => {
  return (
    <TableCell>
      <Typography color={customColors.textLight}>
        {value && value !== '0000-00-00' ? dateFormat(value, 'dd.mm.yyyy') : '-'}
      </Typography>
    </TableCell>
  );
};

export default CellDate;
