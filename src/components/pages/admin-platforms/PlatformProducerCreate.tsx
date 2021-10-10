import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import Modal from '../../common/Modal';
import { Send as SendIcon } from '@mui/icons-material';

// === Helper === //
import { useFormik } from 'formik';
import * as yup from 'yup';

interface PlatformProducerCreateProps {
  open: boolean;
  handleClose: Function;
  getAllProducers: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę producenta!'),
});

const PlatformProducerCreate = ({
  open,
  handleClose,
  getAllProducers,
}: PlatformProducerCreateProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        name: values.name,
      };

      fetch(`/api/platform-producer-create`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.nameDuplicated) {
            setFormError({
              error: false,
              message: '',
            });
            resetForm();
            getAllProducers();
            handleClose();
          } else {
            setFormError({
              error: true,
              message: json.errorMessage,
            });
          }
          toggleButtonLoading(false);
        })
        .catch((error) => {
          toggleButtonLoading(false);
          console.error(error);
        });
    },
  });

  return (
    <Modal title="Dodaj Producenta" open={open} handleClose={() => handleClose()}>
      <form onSubmit={formik.handleSubmit}>
        <Box my={2}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nazwa"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="filled"
          />
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
            endIcon={<SendIcon />}
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
  );
};

export default PlatformProducerCreate;
