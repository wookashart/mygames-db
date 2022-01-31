import React, { Fragment } from 'react';

// === Components === //
import { TableCell, Typography } from '@mui/material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellListDefaultProps {
  value: string[] | number[] | null;
}

const CellListDefault = ({ value }: CellListDefaultProps) => {
  return (
    <TableCell>
      {value?.map((item, index) => (
        <Fragment key={index}>
          <Typography color={customColors.textLight} display="inline-block" mr="5px">
            {item ? item : '-'}
          </Typography>
          {index !== value.length - 1 ? (
            <Typography color={customColors.textLight} display="inline-block" mr="5px">
              |
            </Typography>
          ) : null}
        </Fragment>
      ))}
    </TableCell>
  );
};

export default CellListDefault;
