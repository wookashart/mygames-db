import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { colors, Paper, Skeleton } from '@mui/material';
import Tab from '../../common/Tab';

const GameDetailLoading = () => {
  return (
    <Box>
      <Paper
        elevation={6}
        sx={{ backgroundColor: colors.grey[800], marginBottom: 2, marginTop: 2 }}
      >
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          <Box p={2}>
            <Skeleton variant="rectangular" width="250px" height="345px" />
            <Skeleton variant="rectangular" width="250px" height="53px" sx={{ marginTop: '2px' }} />
          </Box>

          <Box p={2} flex={1}>
            <Skeleton variant="rectangular" width="450px" height="37px" />
            <Skeleton
              variant="rectangular"
              width="250px"
              height="32px"
              sx={{ marginTop: '16px' }}
            />
            <Skeleton
              variant="rectangular"
              width="350px"
              height="24px"
              sx={{ marginTop: '16px' }}
            />

            <Box mt={4}>
              <Paper
                elevation={6}
                sx={{ backgroundColor: colors.grey[700], marginBottom: 4, marginTop: 2 }}
              >
                <Box display="flex" flexWrap="wrap">
                  <Skeleton
                    variant="rectangular"
                    width="200px"
                    height="22px"
                    sx={{ margin: '16px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="200px"
                    height="22px"
                    sx={{ margin: '16px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="200px"
                    height="22px"
                    sx={{ margin: '16px' }}
                  />
                </Box>
                <Box display="flex" p={2} alignItems="center">
                  <Skeleton
                    variant="rectangular"
                    width="100px"
                    height="22px"
                    sx={{ marginRight: '5px' }}
                  />
                  <Skeleton variant="rectangular" width="200px" height="30px" />
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={6}
        sx={{
          backgroundColor: colors.grey[800],
          marginBottom: 4,
          marginTop: 2,
        }}
      >
        <Tab
          tabs={[
            {
              header: 'Opis',
              content: <Skeleton variant="rectangular" width="100%" height="500px" />,
            },
            {
              header: 'Wymagania sprzętowe',
              content: <Box />,
              disabled: true,
            },
            {
              header: 'Dodatki',
              content: <Box />,
              disabled: true,
            },
          ]}
        />
      </Paper>
    </Box>
  );
};

export default GameDetailLoading;
