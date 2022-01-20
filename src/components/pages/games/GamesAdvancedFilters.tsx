import React from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import Modal from '../../common/Modal';

interface GamesAdvancedFiltersProps {
  open: boolean;
  handleClose: Function;
}

const GamesAdvancedFilters = ({ open, handleClose }: GamesAdvancedFiltersProps) => {
  return (
    <Modal title="Zaawansowane filtrowanie" open={open} size="md" handleClose={handleClose}>
      <Box>
        <div>...</div>

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
            // loadingPosition="end"
            // loading={buttonLoading}
            // endIcon={<Send />}
          >
            Filtruj
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default GamesAdvancedFilters;
