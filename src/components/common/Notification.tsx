import React from 'react';

// === Components === //
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

// === Types === //
import { NotificationType } from '../../types/forms';

interface NotificationProps {
  open: boolean;
  message: string;
  type: NotificationType;
  handleClose: Function;
}

type TransitionProps = Omit<SlideProps, 'right'>;

const TransitionLeft = (props: TransitionProps) => {
  return <Slide {...props} direction="right" />;
};

const Notification = ({ open, handleClose, message, type }: NotificationProps) => {
  const title = {
    success: 'Sukces!',
    error: 'Błąd!',
    warning: 'Uwaga!',
    info: 'Info!',
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        autoHideDuration={5000}
        TransitionComponent={TransitionLeft}
        onClose={() => handleClose()}
      >
        <Alert variant="filled" severity={type} onClose={() => handleClose()}>
          <AlertTitle>{title[type]}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
