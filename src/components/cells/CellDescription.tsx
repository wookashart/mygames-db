import React from 'react';

// === Components === //
import ReactHtmlParser from 'react-html-parser';
import { customColors } from '../../styles/variables';
import { TableCell } from '@mui/material';

interface CellDescriptionProps {
  value: string;
}

const CellDescription = ({ value }: CellDescriptionProps) => {
  return (
    <TableCell width={400} sx={{ color: customColors.textLight }}>
      {ReactHtmlParser(value)}
    </TableCell>
  );
};

export default CellDescription;
