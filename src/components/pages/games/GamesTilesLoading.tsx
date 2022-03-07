import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';

const GamesTilesLoading = () => {
  const items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <Box p={2}>
      <Grid container spacing={1}>
        {items.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item}>
              <Box
                sx={{
                  maxWidth: '200px',
                  padding: 1,
                  margin: 'auto',
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={230} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GamesTilesLoading;
