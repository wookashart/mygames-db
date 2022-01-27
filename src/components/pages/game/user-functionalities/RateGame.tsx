import React, { useState } from 'react';

// === Components == //
import { Box } from '@mui/system';
import { Rating, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import Modal from '../../../common/Modal';

// === Styles === //
import { customColors } from '../../../../styles/variables';

// === Types === //
import { UserFunctionData } from '../../../../types/games';
// import { UserData } from '../../../../types/users';

interface RateGameProps {
  funcData: UserFunctionData | null;
  rateGameModalOpen: boolean;
  userRatio: number | null;
  handleClose: Function;
  handleSetRatio: Function;
  handleRequestRatio: Function;
}

const RateGame = ({
  funcData,
  rateGameModalOpen,
  userRatio,
  handleClose,
  handleSetRatio,
  handleRequestRatio,
}: RateGameProps) => {
  const [buttonLoading, handleButtonLoading] = useState(false);
  const [hover, setHover] = React.useState(-1);

  const labels: { [index: number]: string } = {
    1: 'Beznadziejna',
    2: 'Okropna',
    3: 'Bardzo słaba',
    4: 'Słaba',
    5: 'Przeciętna',
    6: 'Przyzwoita',
    7: 'Dobra',
    8: 'Bardzo dobra',
    9: 'Wspaniała',
    10: 'Arcydzieło!',
  };

  return (
    <Modal
      title={funcData && funcData.ratio ? 'Zmień ocenę' : 'Wystaw ocenę'}
      open={rateGameModalOpen}
      size="md"
      handleClose={() => handleClose()}
    >
      <Box>
        <Box py={4} px={2} display="flex" alignItems="center">
          <Rating
            name="simple-controlled"
            value={userRatio}
            size="large"
            max={10}
            onChange={(event, newValue) => {
              handleSetRatio(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {userRatio !== null && (
            <Box sx={{ ml: 4 }}>
              <Typography color={customColors.textLight} variant="subtitle2" component="p">
                {labels[hover !== -1 ? hover : userRatio]}
              </Typography>
            </Box>
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            type="button"
            color="error"
            variant="contained"
            onClick={() => handleClose()}
            sx={{ marginRight: 2 }}
          >
            Zamknij
          </LoadingButton>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loadingPosition="end"
            loading={buttonLoading}
            endIcon={<Send />}
            onClick={() => handleRequestRatio(handleButtonLoading, handleClose)}
          >
            Oceń
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default RateGame;
