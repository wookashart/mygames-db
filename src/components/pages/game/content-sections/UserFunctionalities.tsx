import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { Button, Skeleton } from '@mui/material';
import { Add, AddTask, Star } from '@mui/icons-material';
import HtmlTooltip from '../../../common/HtmlTooltip';
import RateGame from '../user-functionalities/RateGame';
import AddToLibrary from '../user-functionalities/AddToLibrary';
import StatusManage from '../user-functionalities/StatusManage';

// === Helpers === //
import * as utils from '../../../../utils';

// === Types === //
import { UserFunctionData } from '../../../../types/games';
import { UserData } from '../../../../types/users';
import { ObjKeyStringValString } from '../../../../types/other';

interface UserFunctionalitiesProps {
  funcLoading: boolean;
  userLoading: boolean;
  funcData: UserFunctionData | null;
  user: UserData | null;
  userRatio: number | null;
  handleSetRatio: Function;
  handleRequestRatio: Function;
  handleRequestLibrary: Function;
  handleRequestStatus: Function;
}

const UserFunctionalities = ({
  funcLoading,
  funcData,
  user,
  userLoading,
  userRatio,
  handleSetRatio,
  handleRequestRatio,
  handleRequestLibrary,
  handleRequestStatus,
}: UserFunctionalitiesProps) => {
  const [rateGameModalOpen, handleRateGameModalOpen] = useState(false);
  const [addToLibraryModalOpen, handleAddToLibraryModalOpen] = useState(false);
  const [statusManageModalOpen, handleStatusManageModalOpen] = useState(false);

  const status: ObjKeyStringValString = {
    played: 'Grałem',
    skip: 'Pomijam',
    plan: 'Planuję',
  };

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
                  onClick={() => handleAddToLibraryModalOpen(true)}
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                >
                  <Add />
                  <Box ml={1}>
                    {funcData && funcData.library && funcData.library.length > 0
                      ? 'Gra w bibliotece'
                      : 'Dodaj do biblioteki'}
                  </Box>
                </Button>
                <Button
                  onClick={() => handleStatusManageModalOpen(true)}
                  color="primary"
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: '20px', marginBottom: '10px' }}
                >
                  <AddTask />
                  <Box ml={1}>
                    {funcData && funcData.status
                      ? `Status: ${status[funcData.status.status]} ${
                          funcData.status.time && funcData.status.time > 0
                            ? `(${utils.minutesToHoursAndMinutes(funcData.status.time).hours}h:${
                                utils.minutesToHoursAndMinutes(funcData.status.time).minutes
                              }m)`
                            : ''
                        }`
                      : 'Zmień status'}
                  </Box>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box display="flex" flexWrap="wrap">
                <HtmlTooltip label="<p>Musisz się zalogować żeby ocenić grę!</p>" placement="top">
                  <Box>
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
                  </Box>
                </HtmlTooltip>
                <HtmlTooltip
                  label="<p>Musisz się zalogować żeby dodać do biblioteki!</p>"
                  placement="top"
                >
                  <Box>
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
                  </Box>
                </HtmlTooltip>
                <HtmlTooltip
                  label="<p>Musisz się zalogować żeby zmienić status!</p>"
                  placement="top"
                >
                  <Box>
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
                </HtmlTooltip>
              </Box>
            </Box>
          )}
        </>
      )}

      {funcData && (
        <>
          <RateGame
            funcData={funcData}
            rateGameModalOpen={rateGameModalOpen}
            userRatio={userRatio}
            handleClose={() => handleRateGameModalOpen(false)}
            handleSetRatio={handleSetRatio}
            handleRequestRatio={handleRequestRatio}
          />
          <AddToLibrary
            funcData={funcData}
            modalOpen={addToLibraryModalOpen}
            handleClose={() => handleAddToLibraryModalOpen(false)}
            handleSubmit={handleRequestLibrary}
          />
          <StatusManage
            funcData={funcData}
            modalOpen={statusManageModalOpen}
            handleCloseModal={() => handleStatusManageModalOpen(false)}
            handleSubmit={handleRequestStatus}
          />
        </>
      )}
    </>
  );
};

export default UserFunctionalities;
