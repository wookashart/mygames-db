import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import Modal from '../../common/Modal';
import Notification from '../../common/Notification';

// === Helper === //
import { useFormik } from 'formik';

// === Styles === //
import { customColors } from '../../../styles/variables';

// === Types === //
import { CompanyData } from '../../../types/admin';
import { colors, Typography } from '@mui/material';
import { NotificationType } from '../../../types/forms';

interface CompanyDeleteProps {
  editItem: CompanyData | null;
  open: boolean;
  handleClose: Function;
  handleReloadData: Function;
}

const CompanyDelete = ({ editItem, open, handleClose, handleReloadData }: CompanyDeleteProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: '' });
  const [notification, handleNotification] = React.useState({
    open: false,
    message: '',
    type: 'success' as NotificationType,
  });

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: () => {
      toggleButtonLoading(true);

      const input = {
        id: editItem?.id,
      };

      fetch(`/api/company-delete`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error) {
            handleNotification({
              open: true,
              message: `Poprawnie usunięto firmę ${editItem?.name}!`,
              type: 'success',
            });
            setFormError({
              error: false,
              message: '',
            });
            handleClose();
            handleReloadData();
          } else {
            handleNotification({
              open: true,
              message: `Nie udało się usunąć firmy!`,
              type: 'error',
            });
            setFormError({
              error: true,
              message: json.errorMessage,
            });
          }
        })
        .catch((error) => {
          toggleButtonLoading(false);
          setFormError({
            error: true,
            message: error,
          });
          console.error(error);
        });
    },
  });

  return (
    <>
      <Modal
        title="Usuń producenta"
        open={open}
        size="sm"
        handleClose={() => {
          setFormError({
            error: false,
            message: '',
          });
          handleClose();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <Typography color={customColors.textLight}>
              Czy na pewno chcesz usunąć firmę: <strong>{editItem?.name}</strong>?
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <LoadingButton
              type="button"
              color="error"
              variant="contained"
              onClick={() => {
                setFormError({
                  error: false,
                  message: '',
                });
                handleClose();
              }}
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
            >
              Wyślij
            </LoadingButton>
          </Box>

          {formError.error && (
            <Box mt={2}>
              <Typography variant="body2" component="p" color={colors.red[500]} fontSize={12}>
                {formError.message}
              </Typography>
            </Box>
          )}
        </form>
      </Modal>
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        handleClose={() =>
          handleNotification({
            open: false,
            message: '',
            type: 'success',
          })
        }
      />
    </>
  );
};

export default CompanyDelete;
