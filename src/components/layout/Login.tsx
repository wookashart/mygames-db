import React, { useState } from 'react';
import Router from 'next/router';

// === Components === //
import { colors, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import Modal from '../common/Modal';

// === Helpers === //
import * as yup from 'yup';

// === Types === //
import { useFormik } from 'formik';

interface LoginProps {
  pageType: string;
  open: boolean;
  handleClose: Function;
  handleSetUser: Function;
  toggleUserLoading: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę użytkownika!'),
  password: yup.string().required('Musisz podać hasło!'),
});

const Login = ({ pageType, open, handleClose, handleSetUser, toggleUserLoading }: LoginProps) => {
  const pagesToRedirect: string[] = ['register'];
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      toggleUserLoading(true);
      const input = {
        name: values.name,
        password: values.password,
      };

      fetch(`/api/login`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && !json.error && json.user) {
            resetForm();
            setFormError({
              error: false,
              message: '',
            });
            handleSetUser(json.user);
            handleClose();
            if (pagesToRedirect.find((item) => item === pageType)) {
              Router.push('/');
            }
          } else {
            setFormError({
              error: true,
              message: json.errorMessage,
            });
          }
          toggleButtonLoading(false);
          toggleUserLoading(false);
        })
        .catch((error) => {
          toggleButtonLoading(false);
          toggleUserLoading(false);
          console.error(error);
        });
    },
  });

  return (
    <Modal title="Zaloguj się" open={open} handleClose={handleClose}>
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
        <Box mb={2}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Hasło"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

export default Login;
