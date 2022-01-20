import React from 'react';

// === Components === //
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Box } from '@mui/system';

const GamesTableLoading = () => {
  const items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="dense-table">
        <TableBody>
          {items.map((item: number) => {
            return (
              <TableRow key={item}>
                <TableCell width={100}>
                  <Skeleton variant="rectangular" width={80} height={110} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={500} height={30} />
                  <Box mt={1}>
                    <Skeleton variant="rectangular" width={300} height={25} />
                  </Box>
                  <Box mt={1} display="flex">
                    <Box>
                      <Skeleton variant="rectangular" width={200} height={20} />
                    </Box>
                    <Box ml={4}>
                      <Skeleton variant="rectangular" width={200} height={20} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={80} height={80} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GamesTableLoading;
