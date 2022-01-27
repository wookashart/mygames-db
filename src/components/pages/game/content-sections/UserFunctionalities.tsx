import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, Skeleton } from '@mui/material';
import { Add, AddTask, Star } from '@mui/icons-material';
import RateGame from '../user-functionalities/RateGame';

// === Types === //
import { UserFunctionData } from '../../../../types/games';
import { UserData } from '../../../../types/users';

interface UserFunctionalitiesProps {
  funcLoading: boolean;
  userLoading: boolean;
  funcData: UserFunctionData | null;
  user: UserData | null;
  userRatio: number | null;
  handleSetRatio: Function;
  handleRequestRatio: Function;
}

const UserFunctionalities = ({
  funcLoading,
  funcData,
  user,
  userLoading,
  userRatio,
  handleSetRatio,
  handleRequestRatio,
}: UserFunctionalitiesProps) => {
  const [rateGameModalOpen, handleRateGameModalOpen] = useState(false);

  return (
    <>
      {userLoading || funcLoading ? (
        <Skeleton width="100%" height="40px" />
      ) : (
        <>
          {user ? (
            <Box>
              <Box display="flex" flexWrap="wrap">
                <Button
                  onClick={() => handleRateGameModalOpen(true)}
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginBottom: '10px' }}
                >
                  <Star />
                  <Box ml={1}>
                    {funcData && funcData.ratio
                      ? `Twoja ocena: ${funcData.ratio.ratio}`
                      : 'Oceń grę'}
                  </Box>
                </Button>
                <Button
                  // onClick={handleClick}
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                >
                  <Add />
                  <Box ml={1}>Dodaj do biblioteki</Box>
                </Button>
                <Button
                  // onClick={handleClick}
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                >
                  <AddTask />
                  <Box ml={1}>Zmień status</Box>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box display="flex" flexWrap="wrap">
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled
                  sx={{ marginBottom: '10px' }}
                >
                  <Star />
                  <Box ml={1}>Oceń grę</Box>
                </Button>
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                  disabled
                >
                  <Add />
                  <Box ml={1}>Dodaj do biblioteki</Box>
                </Button>
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                  disabled
                >
                  <AddTask />
                  <Box ml={1}>Zmień status</Box>
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}

      <RateGame
        funcData={funcData}
        rateGameModalOpen={rateGameModalOpen}
        userRatio={userRatio}
        handleClose={() => handleRateGameModalOpen(false)}
        handleSetRatio={handleSetRatio}
        handleRequestRatio={handleRequestRatio}
      />
    </>
  );
};

export default UserFunctionalities;
