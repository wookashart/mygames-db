import React from 'react';

// === Components === //
import ReactHtmlParser from 'react-html-parser';
import { TableCell } from '@mui/material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellDescriptionProps {
  value: string;
}

const CellDescription = ({ value }: CellDescriptionProps) => {
  return (
    <>
      <TableCell
        width={400}
        sx={{
          color: customColors.textLight,
        }}
      >
        <div className="cellDescription">{ReactHtmlParser(value)}</div>
      </TableCell>
      <style jsx global>{`
        .cellDescription p {
          margin: 5px 0;
        }
      `}</style>
    </>
  );
};

export default CellDescription;
