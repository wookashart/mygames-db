import React from 'react';

// === Components === //
import { colors, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface CustomModalProps {
  children: React.ReactChild;
  title: string;
  open: boolean;
  size?: 'sm' | 'md';
  handleClose: Function;
}

const CustomModal = ({ children, title, open, handleClose, size = 'sm' }: CustomModalProps) => {
  let modalWidth = 400;

  if (size === 'sm') {
    modalWidth = 400;
  } else if (size === 'md') {
    modalWidth = 800;
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: modalWidth,
    bgcolor: colors.grey[800],
    boxShadow: 24,
    borderRadius: '4px',
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" color="white">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
