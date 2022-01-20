import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, TableCell, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

// === Styles === //
import { customColors } from '../../styles/variables';

interface CellRatioProps {
  ratio: number | string | null;
}

const CellRatio = ({ ratio }: CellRatioProps) => {
  return (
    <TableCell width={100}>
      {ratio && ratio !== '' ? (
        <Box display="flex" alignItems="center">
          <Star
            sx={{
              color: colors.orange[300],
              width: '35px',
              height: '35px',
              marginRight: '5px',
            }}
          />
          <Typography color={customColors.textLight} variant="h6" component="p">
            {ratio}
          </Typography>
        </Box>
      ) : null}
    </TableCell>
  );
};

export default CellRatio;
