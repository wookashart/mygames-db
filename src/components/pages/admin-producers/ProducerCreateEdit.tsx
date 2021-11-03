import React, { useState } from 'react';

// === Components === //
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { colors, Grid, Typography } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Send } from '@mui/icons-material';
import Modal from '../../common/Modal';
import Wysiwig from '../../common/form/Wysiwig';

// === Helper === //
import { useFormik } from 'formik';
import * as yup from 'yup';

// === Types === //
import { ProducerData } from '../../../types/admin';

interface ProducerCreateEditProps {
  editItem: ProducerData | null;
  open: boolean;
  handleClose: Function;
  handleReloadData: Function;
}

const validationSchema = yup.object({
  name: yup.string().required('Musisz podać nazwę!'),
});

const ProducerCreateEdit = ({
  editItem,
  open,
  handleClose,
  handleReloadData,
}: ProducerCreateEditProps) => {
  const [buttonLoading, toggleButtonLoading] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: '' });

  const formik = useFormik({
    initialValues: {
      name: editItem ? editItem.producer_name : '',
      description: editItem ? editItem.producer_description : '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      toggleButtonLoading(true);
      const input = {
        id: editItem ? editItem.producer_id : null,
        name: values.name,
        description: values.description,
      };

      fetch(`/api/${editItem ? 'producer-edit' : 'producer-create'}`, {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...input }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.nameDuplicated) {
            setFormError({
              error: true,
              message: json.errorMessage,
            });
          } else {
            resetForm();
            setFormError({
              error: false,
              message: '',
            });
            handleClose();
            handleReloadData();
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
    <Modal
      title={editItem ? 'Edytuj producenta' : 'Dodaj producenta'}
      open={open}
      size="md"
      handleClose={() => {
        setFormError({
          error: false,
          message: '',
        });
        handleClose();
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container mt={2}>
          <Grid item xs={12} md={12} pr={{ md: 1 }} mb={2}>
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
          </Grid>
        </Grid>

        <Box my={2}>
          <Wysiwig
            label="Opis"
            value={formik.values.description}
            onChange={(value: string) => formik.setFieldValue('description', value)}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end">
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
  );
};

export default ProducerCreateEdit;
